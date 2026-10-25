# Optional Supabase storage

Browser storage is the default; no database setup is needed for a demo.

The `/api/workspace` adapter expects a trusted gateway to inject `oai-authenticated-user-id`. The private hosted preview supplies this identity. A standalone public Next.js server does not. Implement authenticated user lookup before enabling this adapter publicly; do not trust a client-supplied header.

The service-role key stays server side. Queries filter by the authenticated owner ID. The table is not exposed to anonymous/browser clients.

Suggested schema for your own Supabase project, after reviewing the identity boundary:

```sql
create table public.sahayak_workspaces (
  owner_id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.sahayak_workspaces enable row level security;
revoke all on public.sahayak_workspaces from anon, authenticated;
grant select, insert, update, delete on public.sahayak_workspaces to service_role;
```

Only the server service role uses this table. Never expose the service-role key through a NEXT_PUBLIC_ variable.

Cloud save/restore is explicit in the workspace dialog. It does not synchronize API keys. This adapter has not been tested against your live database.
