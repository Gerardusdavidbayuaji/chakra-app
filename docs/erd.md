# 📊 Entity Relationship Diagram (ERD)

## MVP Payment Installment System

```mermaid
erDiagram
    Users {
        UUID Id PK
        string Name
        string Email
        string TelegramChatId
        datetime CreatedAt
    }

    Premi {
        UUID Id PK
        UUID UserId FK
        decimal TotalAmount
        decimal InstallmentAmount
        int Tenor
        int DueDay
        int GracePeriodDays
        string Status "Active | Completed | Cancelled"
        datetime CreatedAt
    }

    Installments {
        UUID Id PK
        UUID PremiId FK
        int InstallmentNumber
        datetime DueDate
        decimal Amount
        string Status "Pending | Reminder1Sent | Reminder2Sent | Paid | Overdue"
        int ReminderCount
        string MidtransOrderId UK "Unique"
        datetime PaidAt
        bytea RowVersion "Optimistic Concurrency"
        datetime CreatedAt
    }

    OutboxMessages {
        UUID Id PK
        string Type "TelegramReminder | PaymentSuccess"
        json Payload
        bool IsProcessed
        int RetryCount
        datetime CreatedAt
        datetime ProcessedAt
    }

    AuditLogs {
        UUID Id PK
        string Entity
        UUID EntityId
        string Action
        json Metadata
        datetime CreatedAt
    }

    Users ||--o{ Premi : "memiliki"
    Premi ||--o{ Installments : "dibagi menjadi"
    Installments ||--o{ OutboxMessages : "trigger"
    Installments ||--o{ AuditLogs : "dicatat"
    Premi ||--o{ AuditLogs : "dicatat"
```

## Penjelasan Relasi

| Relasi                        | Tipe        | Keterangan                                                                                      |
| ----------------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| Users → Premi                 | One-to-Many | Satu user bisa memiliki banyak premi                                                            |
| Premi → Installments          | One-to-Many | Satu premi dipecah menjadi beberapa cicilan berdasarkan tenor                                   |
| Installments → OutboxMessages | One-to-Many | Setiap perubahan status installment bisa menghasilkan outbox message (reminder/payment success) |
| Installments → AuditLogs      | One-to-Many | Setiap perubahan installment dicatat di audit log                                               |
| Premi → AuditLogs             | One-to-Many | Perubahan status premi juga dicatat                                                             |

## Constraints

- **Unique**: `Installments.MidtransOrderId` – mencegah duplikasi order ke Midtrans
- **Unique Composite**: `Installments(PremiId, InstallmentNumber)` – mencegah duplikasi nomor cicilan per premi
- **Optimistic Concurrency**: `Installments.RowVersion` – mencegah race condition saat update bersamaan
