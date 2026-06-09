-- Supabase migration: admin_profiles, enquiries, orders, alerts
-- Enable required extensions

create extension if not exists pgcrypto;

-- Admin role mapping table
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

-- Enquiries
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  email text not null,
  phone text,
  occasion text not null,
  delivery_date date not null,
  message text not null,

  status text not null default 'new',
  notes text not null default '',
  contact_method text,
  budget text,
  timeframe text,
  source text,

  created_at timestamptz not null default now()
);

-- Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),

  email text not null,
  customer_info jsonb,
  items jsonb not null default '[]'::jsonb,

  total_price numeric(12,2) not null default 0,

  status text not null default 'pending',
  status_history jsonb not null default '[]'::jsonb,

  created_at timestamptz not null default now()
);

-- Alerts (single active banner)
create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  message text not null default '',
  is_active boolean not null default false,
  background_color text not null default 'bg-black',
  text_color text not null default 'text-white',
  updated_at timestamptz not null default now()
);

-- Updated_at trigger for alerts
create or replace function public.set_alerts_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_alerts_updated_at on public.alerts;
create trigger trg_alerts_updated_at
before update on public.alerts
for each row execute function public.set_alerts_updated_at();

-- Enable Row Level Security
alter table public.admin_profiles enable row level security;
alter table public.enquiries enable row level security;
alter table public.orders enable row level security;
alter table public.alerts enable row level security;

-- Admin verification predicate
-- exists(select 1 from public.admin_profiles ap where ap.id = auth.uid())

-- Policies: admin_profiles
create policy "admin_profiles_select_own"
on public.admin_profiles
for select
using (id = auth.uid());

create policy "admin_profiles_insert_own"
on public.admin_profiles
for insert
with check (id = auth.uid());

create policy "admin_profiles_update_own"
on public.admin_profiles
for update
using (id = auth.uid())
with check (id = auth.uid());

-- Policies: enquiries (admins can CRUD)
create policy "enquiries_admin_all"
on public.enquiries
for all
using (
  exists (
    select 1
    from public.admin_profiles ap
    where ap.id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.admin_profiles ap
    where ap.id = auth.uid()
  )
);

-- Policies: orders (admins can CRUD)
create policy "orders_admin_all"
on public.orders
for all
using (
  exists (
    select 1
    from public.admin_profiles ap
    where ap.id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.admin_profiles ap
    where ap.id = auth.uid()
  )
);

-- Policies: alerts (admins can CRUD)
create policy "alerts_admin_all"
on public.alerts
for all
using (
  exists (
    select 1
    from public.admin_profiles ap
    where ap.id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.admin_profiles ap
    where ap.id = auth.uid()
  )
);

