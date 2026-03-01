# 📈 Business Flow Diagram

## MVP Payment Installment System

---

## 1. Flow Utama – Admin Membuat Premi & Generate Cicilan

```mermaid
flowchart TD
    A[Admin Login] --> B[Admin Buat Premi]
    B --> C{Input Valid?}
    C -->|Tidak| B
    C -->|Ya| D[Simpan Premi ke DB]
    D --> E[Generate Installments]
    E --> F["Buat N cicilan berdasarkan Tenor"]
    F --> G["Set DueDate tiap cicilan (berdasarkan DueDay)"]
    G --> H["Set Status = Pending"]
    H --> I["Generate MidtransOrderId (unique)"]
    I --> J[Simpan Installments ke DB]
    J --> K[✅ Premi & Cicilan Berhasil Dibuat]

    style A fill:#4CAF50,color:#fff
    style K fill:#4CAF50,color:#fff
    style C fill:#FF9800,color:#fff
```

---

## 2. Flow Scheduler Harian (00:00)

```mermaid
flowchart TD
    START[⏰ Scheduler Berjalan 00:00] --> S1

    subgraph S1["Step 1: Check Due Installments"]
        A1["Query: Status = Pending AND DueDate = Today"] --> B1{Ada data?}
        B1 -->|Ya| C1["BEGIN TRANSACTION"]
        C1 --> D1["Update Status → Reminder1Sent"]
        D1 --> E1["ReminderCount = 1"]
        E1 --> F1["Insert OutboxMessage (TelegramReminder)"]
        F1 --> G1["Insert AuditLog"]
        G1 --> H1["COMMIT"]
        B1 -->|Tidak| NEXT1[Lanjut ke Step 2]
        H1 --> NEXT1
    end

    NEXT1 --> S2

    subgraph S2["Step 2: Check Grace Period Expired"]
        A2["Query: Status = Reminder1Sent AND DueDate + GracePeriod = Today"] --> B2{Ada data?}
        B2 -->|Ya| C2["BEGIN TRANSACTION"]
        C2 --> D2["Update Status → Reminder2Sent"]
        D2 --> E2["ReminderCount = 2"]
        E2 --> F2["Insert OutboxMessage (TelegramReminder)"]
        F2 --> G2["COMMIT"]
        B2 -->|Tidak| NEXT2[Lanjut ke Step 3]
        G2 --> NEXT2
    end

    NEXT2 --> S3

    subgraph S3["Step 3: Mark Overdue"]
        A3["Query: Status = Reminder2Sent AND DueDate + GracePeriod x 2 = Today"] --> B3{Ada data?}
        B3 -->|Ya| C3["BEGIN TRANSACTION"]
        C3 --> D3["Update Status → Overdue"]
        D3 --> E3["Insert AuditLog"]
        E3 --> F3["COMMIT"]
        B3 -->|Tidak| END1[✅ Scheduler Selesai]
        F3 --> END1
    end

    style START fill:#2196F3,color:#fff
    style END1 fill:#4CAF50,color:#fff
```

---

## 3. Flow Outbox Worker

```mermaid
flowchart TD
    A["🔄 Outbox Worker (loop setiap N detik)"] --> B["Query: IsProcessed = false LIMIT 50"]
    B --> C{Ada message?}
    C -->|Tidak| A
    C -->|Ya| D[Proses message satu per satu]
    D --> E{Tipe message?}
    E -->|TelegramReminder| F[Kirim Reminder via Telegram Bot]
    E -->|PaymentSuccess| G[Kirim Notifikasi Sukses via Telegram]
    F --> H{Berhasil?}
    G --> H
    H -->|Ya| I["Set IsProcessed = true, ProcessedAt = now"]
    H -->|Tidak| J{RetryCount < 5?}
    J -->|Ya| K[RetryCount++ dan coba lagi nanti]
    J -->|Tidak| L[⚠️ Log error dan skip]
    I --> M[Lanjut message berikutnya]
    K --> M
    L --> M
    M --> C

    style A fill:#9C27B0,color:#fff
    style L fill:#F44336,color:#fff
```

---

## 4. Flow Pembayaran User via Midtrans

```mermaid
flowchart TD
    A[👤 User Buka Halaman Cicilan] --> B[Pilih Cicilan yang Akan Dibayar]
    B --> C[Klik Bayar]
    C --> D["Generate Snap Token via Midtrans API"]
    D --> E[Redirect ke Midtrans Payment Page]
    E --> F[User Bayar]
    F --> G["Midtrans Kirim Webhook ke .NET API"]

    G --> H["POST /api/midtrans/webhook"]
    H --> I{Validasi Signature Key}
    I -->|Invalid| J[❌ Reject 403]
    I -->|Valid| K{Idempotency Check}
    K -->|Status = Paid| L["✅ Ignore (sudah diproses)"]
    K -->|Status ≠ Paid| M["BEGIN TRANSACTION"]
    M --> N["Update Status → Paid"]
    N --> O["Set PaidAt = now"]
    O --> P["Insert OutboxMessage (PaymentSuccess)"]
    P --> Q["Insert AuditLog"]
    Q --> R{Semua cicilan lunas?}
    R -->|Ya| S["Update Premi.Status → Completed"]
    R -->|Tidak| T["COMMIT"]
    S --> T
    T --> U["✅ Return 200 OK"]

    style A fill:#2196F3,color:#fff
    style J fill:#F44336,color:#fff
    style L fill:#FF9800,color:#fff
    style U fill:#4CAF50,color:#fff
```

---

## 5. Flow Lengkap End-to-End

```mermaid
flowchart LR
    subgraph Admin
        A1[Buat Premi] --> A2[Generate Cicilan]
    end

    subgraph Scheduler
        S1[Daily Check 00:00] --> S2[Update Status]
        S2 --> S3[Insert Outbox]
    end

    subgraph OutboxWorker["Outbox Worker"]
        O1[Baca Outbox] --> O2[Kirim Telegram]
    end

    subgraph Payment
        P1[User Bayar] --> P2[Midtrans Webhook]
        P2 --> P3[Atomic Update]
        P3 --> P4[Insert Outbox Success]
        P4 --> P5{Semua Lunas?}
        P5 -->|Ya| P6[Premi Completed]
    end

    A2 --> S1
    S3 --> O1
    P4 --> O1

    style Admin fill:#E3F2FD,stroke:#1565C0
    style Scheduler fill:#FFF3E0,stroke:#E65100
    style OutboxWorker fill:#F3E5F5,stroke:#6A1B9A
    style Payment fill:#E8F5E9,stroke:#2E7D32
```

---

## 6. Status Transition Diagram – Installment

```mermaid
stateDiagram-v2
    [*] --> Pending : Cicilan dibuat
    Pending --> Reminder1Sent : DueDate = Today (Scheduler)
    Reminder1Sent --> Reminder2Sent : DueDate + GracePeriod = Today
    Reminder2Sent --> Overdue : DueDate + GracePeriod x 2 = Today

    Pending --> Paid : User bayar via Midtrans
    Reminder1Sent --> Paid : User bayar via Midtrans
    Reminder2Sent --> Paid : User bayar via Midtrans
    Overdue --> Paid : User bayar setelah overdue

    Paid --> [*]
```

---

## 7. Status Transition Diagram – Premi

```mermaid
stateDiagram-v2
    [*] --> Active : Admin buat premi
    Active --> Completed : Semua cicilan berstatus Paid
    Active --> Cancelled : Admin batalkan premi

    Completed --> [*]
    Cancelled --> [*]
```
