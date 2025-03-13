-- Création des tables Supabase

-- Table des employés
create table public.employees (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  first_name text not null,
  last_name text not null,
  email text not null unique,
  phone text,
  department text not null,
  position text not null,
  hire_date date not null,
  status text default 'ACTIVE'::text,
  manager_id uuid references public.employees(id),
  profile_url text
);

-- Table des bulletins de paie
create table public.payrolls (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  employee_id uuid references public.employees(id) not null,
  period text not null,
  base_salary numeric not null,
  gross_salary numeric not null,
  net_salary numeric not null,
  cnss numeric not null,
  its numeric not null,
  total_deductions numeric not null,
  status text default 'PENDING'::text,
  payment_date timestamp with time zone,
  validated_by uuid references auth.users(id)
);

-- Table des éléments de paie (primes et déductions)
create table public.payroll_items (
  id uuid default uuid_generate_v4() primary key,
  payroll_id uuid references public.payrolls(id) not null,
  type text not null,
  description text not null,
  amount numeric not null,
  category text not null check (category in ('BONUS', 'DEDUCTION'))
);

-- Politiques de sécurité RLS (Row Level Security)

-- Politique pour les employés
alter table public.employees enable row level security;

create policy "Les utilisateurs authentifiés peuvent lire tous les employés"
  on public.employees for select
  to authenticated
  using (true);

create policy "Seuls les administrateurs peuvent modifier les employés"
  on public.employees for all
  to authenticated
  using (auth.jwt() ->> 'role' = 'ADMIN');

-- Politique pour les bulletins de paie
alter table public.payrolls enable row level security;

create policy "Les utilisateurs peuvent voir leurs propres bulletins"
  on public.payrolls for select
  to authenticated
  using (
    auth.uid() = employee_id or
    auth.jwt() ->> 'role' in ('ADMIN', 'HR')
  );

create policy "Seuls les RH peuvent créer et modifier les bulletins"
  on public.payrolls for all
  to authenticated
  using (auth.jwt() ->> 'role' in ('ADMIN', 'HR'));

-- Politique pour les éléments de paie
alter table public.payroll_items enable row level security;

create policy "Les utilisateurs peuvent voir leurs propres éléments de paie"
  on public.payroll_items for select
  to authenticated
  using (
    exists (
      select 1 from public.payrolls
      where payrolls.id = payroll_items.payroll_id
      and (payrolls.employee_id = auth.uid() or auth.jwt() ->> 'role' in ('ADMIN', 'HR'))
    )
  );

create policy "Seuls les RH peuvent créer et modifier les éléments de paie"
  on public.payroll_items for all
  to authenticated
  using (auth.jwt() ->> 'role' in ('ADMIN', 'HR'));

-- Index pour améliorer les performances
create index employees_department_idx on public.employees(department);
create index employees_status_idx on public.employees(status);
create index payrolls_employee_id_idx on public.payrolls(employee_id);
create index payrolls_period_idx on public.payrolls(period);
create index payroll_items_payroll_id_idx on public.payroll_items(payroll_id);
