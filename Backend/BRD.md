# Business Requirements Document (BRD)
# ChakraApp — Sistem Manajemen Cicilan Pembayaran

**Versi:** 1.0  
**Tanggal:** 2026-05-18  
**Status:** Draft  

---

## 1. Latar Belakang

ChakraApp adalah sistem manajemen cicilan pembayaran (installment) berbasis web. Backend dibangun dengan .NET 9 Clean Architecture, menggunakan Supabase sebagai auth provider dan PostgreSQL database, Midtrans sebagai payment gateway, dan Telegram untuk notifikasi.

Project saat ini sudah memiliki fondasi arsitektur dan modul User yang fungsional, namun fitur inti (Premi & Cicilan) belum diimplementasikan.

---

## 2. Stakeholder

| Role | Deskripsi |
|------|-----------|
| Admin | Mengelola data premi, melihat laporan, konfirmasi pembayaran |
| Nasabah (User) | Melihat tagihan, melakukan pembayaran via Midtrans |
| Sistem | Mengirim notifikasi Telegram, mencatat audit log |

---

## 3. Functional Requirements

### FR-01: Manajemen User
- [x] User dapat dibuat dengan Name, Email, SupabaseAuthId, TelegramChatId
- [x] Email harus unik
- [ ] User dapat melihat profile sendiri (`GET /api/users/me`)
- [ ] User dapat diupdate dan dihapus (soft delete)

### FR-02: Autentikasi & Otorisasi
- [x] JWT authentication via Supabase
- [x] Endpoint `GET /api/auth/me` untuk mendapatkan user ID
- [ ] Role-based access control (Admin vs Nasabah)
- [ ] Endpoint untuk sinkronisasi user ke database setelah auth Supabase

### FR-03: Manajemen Premi
- [ ] Admin dapat membuat Premi (paket cicilan) untuk nasabah
- [ ] Premi memiliki: UserId, TotalAmount, Tenor (bulan), StartDate, Status (Active/Completed/Cancelled)
- [ ] Saat Premi dibuat, otomatis generate Installment records sesuai tenor
- [ ] Admin dapat update dan cancel Premi
- [ ] Pagination + filter untuk list Premi

### FR-04: Manajemen Cicilan (Installments)
- [ ] Setiap Premi memiliki N cicilan berdasarkan tenor
- [ ] Cicilan memiliki: PremiId, DueDate, Amount, Status (Pending/Paid/Overdue), MidtransOrderId
- [ ] Status cicilan terupdate otomatis via Midtrans webhook

### FR-05: Integrasi Midtrans
- [ ] Generate Snap Token untuk pembayaran cicilan
- [ ] Webhook handler untuk konfirmasi pembayaran dari Midtrans
- [ ] Setelah payment confirm → update status cicilan → trigger notifikasi

### FR-06: Notifikasi Telegram
- [ ] Kirim notifikasi saat cicilan jatuh tempo (H-3, H-1)
- [ ] Kirim konfirmasi saat pembayaran berhasil
- [ ] Outbox pattern untuk reliability

### FR-07: Audit Log
- [ ] Setiap perubahan data penting tercatat di AuditLogs table

---

## 4. Non-Functional Requirements

| Kategori | Requirement |
|----------|-------------|
| Security | JWT validation, secrets di environment variables (bukan hardcode di config) |
| Performance | Response time < 500ms untuk endpoint standar |
| Reliability | Outbox pattern untuk notifikasi tidak terlewat |
| Scalability | Stateless API, connection pooling via Supabase |
| Maintainability | Clean Architecture, CQRS, FluentValidation |

---

## 5. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | .NET 9, ASP.NET Core Minimal API |
| Architecture | Clean Architecture + CQRS (MediatR 14) |
| Database | PostgreSQL via Supabase (EF Core 9 + Npgsql) |
| Auth | Supabase JWT (JwtBearer) |
| Payment | Midtrans Snap |
| Notification | Telegram Bot API |
| Docs | Scalar (OpenAPI) |
| Logging | Serilog + OpenTelemetry |
| Validation | FluentValidation 12 |
| Mapping | Mapster 10 |
| Pagination | Gridify |

---

## 6. Arsitektur Sistem

```
Client (Web/Mobile)
    │
    ▼
ChakraApp.API (ASP.NET Core Minimal API)
    │   ├── Endpoints (Auth, User, Premi, Webhook)
    │   ├── Configurations (Auth, Persistence, OpenAPI)
    │   └── Program.cs
    │
    ▼ MediatR
ChakraApp.Application (Business Logic)
    │   ├── Features/Users (Commands, Queries, DTOs)
    │   ├── Features/Premi (Commands, Queries, DTOs)
    │   ├── Common (IApplicationDbContext, ICurrentUserService)
    │   └── Behaviors (Validation, Logging)
    │
    ▼ Interfaces
ChakraApp.Infrastructure (Data Access & External Services)
    │   ├── ApplicationDbContext (EF Core + Npgsql)
    │   ├── Configuration (UserConfig, PremiConfig)
    │   ├── Services (CurrentUserService, MidtransService, TelegramService)
    │   ├── Interceptors (AuditableEntity, DomainEvents)
    │   └── Migrations
    │
    ▼ Entities only
ChakraApp.Domain (Core Domain)
    │   ├── Entities (User, Premi, Installment, OutboxMessage)
    │   ├── Enums (PremiStatus, InstallmentStatus)
    │   ├── Events (InstallmentPaidEvent)
    │   └── Common (Entity, Aggregate, AuditableEntity)
    │
    ├── PostgreSQL (Supabase)
    ├── Supabase Auth (JWT)
    ├── Midtrans API
    └── Telegram Bot API
```

---

## 7. Database Schema

### Tabel: Users (Sudah Ada)
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| Id | UUID | Primary Key |
| Name | VARCHAR(255) | Nama user |
| Email | VARCHAR(255) | UNIQUE |
| SupabaseAuthId | VARCHAR | Link ke Supabase auth |
| TelegramChatId | VARCHAR(100) | Untuk notifikasi |
| CreatedAt | TIMESTAMP | Auto |
| UpdatedAt | TIMESTAMP | Auto |

### Tabel: Premi (Perlu Dibuat)
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| Id | UUID | Primary Key |
| UserId | UUID | FK → Users.Id |
| TotalAmount | DECIMAL(18,2) | Total nilai premi |
| Tenor | INT | Jumlah cicilan (bulan) |
| StartDate | DATE | Tanggal mulai |
| Status | VARCHAR | Active/Completed/Cancelled |
| CreatedAt | TIMESTAMP | Auto |
| UpdatedAt | TIMESTAMP | Auto |

### Tabel: Installments (Perlu Dibuat)
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| Id | UUID | Primary Key |
| PremiId | UUID | FK → Premi.Id |
| DueDate | DATE | Tanggal jatuh tempo |
| Amount | DECIMAL(18,2) | Nominal cicilan |
| Status | VARCHAR | Pending/Paid/Overdue |
| MidtransOrderId | VARCHAR | Nomor order Midtrans |
| PaidAt | TIMESTAMP | Waktu pembayaran |
| CreatedAt | TIMESTAMP | Auto |

### Tabel: OutboxMessages (Perlu Dibuat)
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| Id | UUID | Primary Key |
| Type | VARCHAR | Tipe event |
| Payload | JSONB | Data event |
| ProcessedAt | TIMESTAMP | Null = belum diproses |
| CreatedAt | TIMESTAMP | Auto |

---

## 8. API Endpoints

### Sudah Ada ✅
| Method | Path | Auth | Deskripsi |
|--------|------|------|-----------|
| GET | `/api/auth/me` | JWT | Get user ID dari token |
| GET | `/api/users/` | - | List semua user |
| POST | `/api/users/` | - | Buat user baru |

### Perlu Diimplementasi
| Method | Path | Auth | Deskripsi |
|--------|------|------|-----------|
| GET | `/api/users/me` | JWT | Profile user yang login |
| PUT | `/api/users/me` | JWT | Update profile |
| GET | `/api/premi/` | JWT Admin | List premi (paginated) |
| GET | `/api/premi/{id}` | JWT | Detail premi + cicilan |
| POST | `/api/premi/` | JWT Admin | Buat premi baru |
| PUT | `/api/premi/{id}` | JWT Admin | Update premi |
| DELETE | `/api/premi/{id}` | JWT Admin | Cancel premi |
| POST | `/api/premi/{id}/installments/{instId}/pay` | JWT | Generate Snap Token |
| POST | `/api/webhooks/midtrans` | Signature | Konfirmasi pembayaran |

---

## 9. State Project Saat Ini

### Sudah Selesai ✅
- Fondasi Clean Architecture (4 layer)
- Domain entity: `User`
- CQRS: `CreateUserCommand`, `GetUsersQuery`
- JWT auth setup via Supabase
- Endpoint: User & Auth
- EF Core migration tabel Users
- Pipeline behaviors: Validation + Logging

### Ada Struktur, Belum Implementasi ⚠️
- Domain enums: `PremiStatus`, `InstallmentStatus`
- Command handlers: `CreatePremi`, `UpdatePremi`, `CancelPremi`
- Query handlers: `GetPaginationPremi`, `GetPremiById`
- `PremiEndpoint.cs` (kosong)
- `MidtransService.cs` (interface ada, implementasi kosong)

### Belum Ada ❌
- Domain entity: `Premi`, `Installments`, `OutboxMessages`
- EF Core migration untuk Premi & Installments
- Midtrans webhook endpoint
- Telegram notification service
- Role-based authorization
- Secrets management (credentials masih hardcode)

---

## 10. Rencana Implementasi (Roadmap)

### FASE 1: Perbaikan Fondasi
1. Pindahkan secrets dari `appsettings.json` ke environment variables / user-secrets
2. Buat domain entity `Premi` dan `Installment`
3. Tambahkan EF Core configuration dan jalankan migration

### FASE 2: Core Business Logic — Premi & Cicilan
1. Implementasi `CreatePremiCommand` (auto-generate installments)
2. Implementasi `GetPaginationPremiQuery` (dengan Gridify)
3. Implementasi `GetPremiByIdQuery`
4. Implementasi `UpdatePremiCommand` dan `CancelPremiCommand`
5. Lengkapi `PremiEndpoint.cs`

### FASE 3: Integrasi Midtrans
1. Implementasi `MidtransService` (generate Snap Token)
2. Buat endpoint `POST /api/premi/{id}/installments/{instId}/pay`
3. Buat Midtrans webhook handler
4. Update status cicilan berdasarkan webhook

### FASE 4: Notifikasi Telegram
1. Buat `TelegramService`
2. Implementasi Outbox pattern (domain event handler)
3. Background service untuk reminder jatuh tempo

### FASE 5: Role-Based Authorization & Profile
1. Tambahkan role claims dari Supabase
2. Buat policy `AdminOnly` dan `UserOnly`
3. Endpoint `GET /api/users/me` dan `PUT /api/users/me`

---

## 11. Risiko & Mitigasi

| Risiko | Level | Mitigasi |
|--------|-------|----------|
| Credentials hardcode di config | Tinggi | Pindahkan ke user-secrets / env vars segera |
| Midtrans webhook tidak terproses | Sedang | Implementasi Outbox pattern |
| Supabase JWT expired | Rendah | Refresh token di sisi client |
| Race condition pada pembayaran | Sedang | Idempotency key pada Midtrans order |
