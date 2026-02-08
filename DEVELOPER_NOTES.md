# Developer Notes - Data Connection & Infrastructure

## Database Connection (Supabase & Payload CMS)

### Issue: IPv6-only Direct Connection
The direct Supabase PostgreSQL endpoint (`db.qsdrlwqmvtcczykginoz.supabase.co`) resolved to an **IPv6 address** only. The local development environment (and potentially some deployment environments) could not connect to it, resulting in `ENOTFOUND` errors.

### Solution: Supabase Connection Pooler (IPv4)
We have switched the `DATABASE_URI` to use the **Supabase Connection Pooler** in **Session Mode** (Port 5432).
- **Host**: `aws-1-ap-south-1.pooler.supabase.com` (Mumbai Region)
- **Status**: Validated connection successfully using a raw `pg` client script. Payload CMS integration pending final confirmation.
- **User Format**: `postgres.qsdrlwqmvtcczykginoz` (Project-scoped user)
- **Why Session Mode?**: Payload CMS requires Prepared Statements, which are not supported in Transaction Mode (Port 6543). Session Mode (Port 5432) supports them while providing an IPv4-compatible endpoint.

## Frontend Data Fetching (`app/page.tsx`)

### Issue: Server-Side Connection Failure
Initially, Server-Side Rendering (SSR) in `app/page.tsx` using the Payload Local API (`getPayload`) failed due to the same IPv6 database connection issue.

### Solution: REST API Fallback
The frontend is currently configured to fetch data using the **Supabase REST API** client (`@supabase/supabase-js`) directly in `getBlocks()`.
- **Reason**: The REST API endpoint (`https://qsdrlwqmvtcczykginoz.supabase.co`) is accessible via IPv4 (HTTPS).
- **Future Improvement**: Once the `DATABASE_URI` fix (above) is confirmed to work for the Admin Panel, we *could* switch `app/page.tsx` back to using the Payload Local API (`getPayload`) for better performance and type safety, but the REST API is a stable fallback.

## Admin Panel (`/admin`)

## Migration to Office Computer (Handover)

Since changes were not committed to Git, please copy the following settings manually to the `.env` file on your office computer:

```ini
# Copy this into .env
DATABASE_URI=postgresql://postgres.qsdrlwqmvtcczykginoz:m9ssQWEp43HQEacr@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
PAYLOAD_SECRET=fc0402158522778393849312
NEXT_PUBLIC_SUPABASE_URL=https://qsdrlwqmvtcczykginoz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzZHJsd3FtdnRjY3p5a2dpbm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNDgzNjAsImV4cCI6MjA4NDcyNDM2MH0.XzFgNoty5BRpSIBVbfzhOL56f8wp-DGM0QHkjMpHkqE
```

**Note**: The password has been updated to `m9ssQWEp43HQEacr`. Using the old password will cause connection failures.
