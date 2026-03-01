# 📘 MVP Payment Installment System

Sistem pembayaran cicilan (installment) yang aman secara finansial dengan arsitektur ACID Transaction, Outbox Pattern, dan Idempotency.

---

## 📋 Daftar Isi

- [Tujuan Sistem](#-tujuan-sistem)
- [Tech Stack](#-tech-stack)
- [Arsitektur](#-arsitektur)
- [Core Architecture Principles](#-core-architecture-principles)
- [Database Design](#-database-design)
- [Scheduler System](#-scheduler-system)
- [Outbox Worker](#-outbox-worker)
- [Midtrans Integration](#-midtrans-integration)
- [Concurrency Protection](#-concurrency-protection)
- [Frontend Scope](#-frontend-scope)
- [Edge Case Handling](#-edge-case-handling)
- [Dokumentasi Tambahan](#-dokumentasi-tambahan)

---

## 🎯 Tujuan Sistem

- Admin membuat premi (total pembayaran)
- Sistem membagi premi menjadi cicilan
- Sistem otomatis mengirim reminder pembayaran
- User membayar via Midtrans
- Sistem mengirim notifikasi sukses via Telegram
- Premi selesai jika semua cicilan lunas

---

## 🛠 Tech Stack

| Layer                        | Teknologi             |
| ---------------------------- | --------------------- |
| **API + Background Service** | .NET (IHostedService) |
| **Database**                 | Supabase (PostgreSQL) |
| **Payment Gateway**          | Midtrans              |
| **Notification**             | Telegram Bot          |
| **Frontend**                 | React TypeScript      |

---

## 🏗 Arsitektur

```
Admin
  ↓
.NET API
  ↓
Supabase (PostgreSQL)
  ↓
Scheduler (IHostedService)
  ↓
Outbox Worker
  ↓
Telegram API

Midtrans → Webhook → .NET API
```

---

## 🔐 Core Architecture Principles

### ✅ Yang Digunakan

| Prinsip                    | Keterangan                                                                              |
| -------------------------- | --------------------------------------------------------------------------------------- |
| **ACID Transaction**       | Semua perubahan installment dilakukan dalam database transaction                        |
| **Outbox Pattern**         | Tidak langsung kirim Telegram dalam transaction – disimpan di outbox, diproses terpisah |
| **Idempotency**            | Webhook dan scheduler tidak memproses installment 2x                                    |
| **Optimistic Concurrency** | RowVersion/Timestamp mencegah race condition                                            |

---

## 🗄 Database Design

### Users

| Field          | Type      |
| -------------- | --------- |
| Id             | UUID (PK) |
| Name           | string    |
| Email          | string    |
| TelegramChatId | string    |
| CreatedAt      | datetime  |

### Premi

| Field             | Type                                       |
| ----------------- | ------------------------------------------ |
| Id                | UUID (PK)                                  |
| UserId            | UUID (FK → Users)                          |
| TotalAmount       | decimal                                    |
| InstallmentAmount | decimal                                    |
| Tenor             | int                                        |
| DueDay            | int                                        |
| GracePeriodDays   | int                                        |
| Status            | enum: `Active` / `Completed` / `Cancelled` |
| CreatedAt         | datetime                                   |

### Installments

| Field             | Type                                                                     |
| ----------------- | ------------------------------------------------------------------------ |
| Id                | UUID (PK)                                                                |
| PremiId           | UUID (FK → Premi)                                                        |
| InstallmentNumber | int                                                                      |
| DueDate           | datetime                                                                 |
| Amount            | decimal                                                                  |
| Status            | enum: `Pending` / `Reminder1Sent` / `Reminder2Sent` / `Paid` / `Overdue` |
| ReminderCount     | int                                                                      |
| MidtransOrderId   | string (unique)                                                          |
| PaidAt            | datetime                                                                 |
| RowVersion        | byte[] (optimistic concurrency)                                          |
| CreatedAt         | datetime                                                                 |

### OutboxMessages

| Field       | Type                                          |
| ----------- | --------------------------------------------- |
| Id          | UUID (PK)                                     |
| Type        | string: `TelegramReminder` / `PaymentSuccess` |
| Payload     | json                                          |
| IsProcessed | bool                                          |
| RetryCount  | int                                           |
| CreatedAt   | datetime                                      |
| ProcessedAt | datetime                                      |

### AuditLogs

| Field     | Type      |
| --------- | --------- |
| Id        | UUID (PK) |
| Entity    | string    |
| EntityId  | UUID      |
| Action    | string    |
| Metadata  | json      |
| CreatedAt | datetime  |

> 📌 Lihat diagram lengkap: [ERD Documentation](docs/erd.md)

---

## ⏰ Scheduler System

Menggunakan `IHostedService` – berjalan setiap hari pukul 00:00.

### Step 1 – Check Due Installments

```
Query: Status = Pending AND DueDate = Today

BEGIN TRANSACTION
→ Update Status = Reminder1Sent
→ ReminderCount = 1
→ Insert OutboxMessage
→ Insert AuditLog
COMMIT
```

### Step 2 – Check Grace Period Expired

```
Query: Status = Reminder1Sent AND DueDate + GracePeriodDays = Today

BEGIN TRANSACTION
→ Status = Reminder2Sent
→ ReminderCount = 2
→ Insert OutboxMessage
COMMIT
```

### Step 3 – Mark Overdue

```
Query: Status = Reminder2Sent AND DueDate + (GracePeriodDays × 2) = Today

BEGIN TRANSACTION
→ Status = Overdue
→ Insert AuditLog
COMMIT
```

---

## 📤 Outbox Worker

Background worker berjalan setiap beberapa detik:

1. Query `OutboxMessages WHERE IsProcessed = false LIMIT 50`
2. Kirim via Telegram
3. **Sukses** → `IsProcessed = true`, set `ProcessedAt`
4. **Gagal** → `RetryCount++`, retry maksimal 5x

**Keuntungan:**

- Jika Telegram gagal → data tetap aman
- Bisa retry tanpa merusak transaction

---

## 💳 Midtrans Integration

### Create Transaction

Saat `Reminder1Sent`: Generate Midtrans OrderId = InstallmentId (unique constraint).

### Webhook Handling

```
POST /api/midtrans/webhook
```

**Step 1** – Validasi Signature Key (wajib)

**Step 2** – Idempotency Check:

```
If Installment.Status == Paid → Ignore
```

**Step 3** – Atomic Update:

```
BEGIN TRANSACTION
→ Update Installment.Status = Paid
→ Set PaidAt
→ Insert OutboxMessage (PaymentSuccess)
→ Insert AuditLog
→ Check semua cicilan lunas
    → If true → Update Premi.Status = Completed
COMMIT
```

---

## 🔒 Concurrency Protection

| Mekanisme                                     | Tujuan                                        |
| --------------------------------------------- | --------------------------------------------- |
| RowVersion (timestamp)                        | Mencegah race condition saat update bersamaan |
| Unique constraint MidtransOrderId             | Mencegah duplikasi order                      |
| Unique constraint InstallmentNumber per Premi | Mencegah duplikasi nomor cicilan              |

---

## 🖥 Frontend Scope

### Admin

- Create Premi
- View Premi list
- View Installment detail
- View Overdue report

### User

- View Installment list
- View status per bulan
- Tidak bisa edit

---

## ⚡ Edge Case Handling

| Case                    | Handling                 |
| ----------------------- | ------------------------ |
| Duplicate webhook       | Idempotency check        |
| Telegram gagal          | Retry via Outbox         |
| Server crash            | Data tetap aman (ACID)   |
| Double scheduler run    | Status-based filtering   |
| Payment setelah overdue | Tetap set `Paid` + audit |

---

## 🛡 System Safety Level

✅ Database consistency (ACID)
✅ External communication safety (Outbox)
✅ Idempotent webhook
✅ Concurrency control
✅ Auditability
✅ Scalable ke ribuan user

---

## 📚 Dokumentasi Tambahan

| Dokumen                                          | Deskripsi                   |
| ------------------------------------------------ | --------------------------- |
| [ERD (Entity Relationship Diagram)](docs/erd.md) | Diagram relasi antar tabel  |
| [Business Flow](docs/business-flow.md)           | Diagram alur bisnis lengkap |

---

## 📄 License

[MIT](LICENSE)
