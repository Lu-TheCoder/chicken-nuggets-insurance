# Database Migrations

This directory contains the database migration system for the Chicken Nuggets Insurance application.

## Prerequisites

1. Make sure your Docker containers are running:
> [!NOTE]
> Ensure you run this in the root folder, where docker-compose.yml is defined.
   ```bash
   docker-compose up -d
   ```

2. Install dependencies (needed to use migrations.js):
> [!NOTE]
> Ensure you run this in the database/src folder.
   ```bash
   npm install
   ```

## Usage

### Running Migrations

**Apply all pending migrations:**
```bash
npm run migrate:up
```

**Rollback the last migration:**
```bash
npm run migrate:down
```

**Generate a new migration:**
```bash
npm run migrate:generate <migration-name>
```

### view created tables:
```bash
docker exec -it chicken-nuggets-postgres psql -U postgres -d chicken_nuggets_insurance -c "\dt"
```

3. Shutdown docker container and reset everything:
> [!NOTE]
> Ensure you run this in the root folder, where docker-compose.yml is defined.
   ```bash
   docker-compose down -v 
   # then run this to start a fresh build 
   docker-compose up --build -v 
   ```

### Examples

```bash
# Generate a new migration for creating a products table
npm run migrate:generate create_products_table

# Apply all pending migrations
npm run migrate:up

# Rollback the last migration
npm run migrate:down
```

## Environment Variables

The migration system uses the following environment variables (with defaults):

- `DB_HOST` (default: localhost)
- `DB_PORT` (default: 5433)
- `DB_USER` (default: postgres)
- `DB_PASSWORD` (default: postgres)
- `DB_NAME` (default: chicken_nuggets_insurance)

## Migration Files

- **Up migrations**: Files ending with `.up.sql` - applied when running `migrate:up`
- **Down migrations**: Files ending with `.down.sql` - applied when running `migrate:down`
- **Naming convention**: `001_migration_name.up.sql` and `001_migration_name.down.sql`

## Troubleshooting

If you get connection errors:
1. Ensure Docker containers are running: `docker-compose ps`
2. Check database logs: `docker-compose logs postgres`
3. Verify environment variables match your Docker setup 