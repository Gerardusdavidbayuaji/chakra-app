# ChakraApp Backend

## Database Migration

Migrasi database dilakukan secara **manual** menggunakan script PowerShell.

### Buat migrasi baru

```powershell
.\add-migration.ps1 -MigrationName "NamaMigrasi"
```

### Terapkan migrasi ke database

```powershell
.\update-database.ps1
```

### Terapkan sampai migrasi tertentu

```powershell
.\update-database.ps1 -MigrationName "NamaMigrasi"
```
