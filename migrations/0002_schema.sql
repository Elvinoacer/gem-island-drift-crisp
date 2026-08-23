-- Aether multi-tenant pharmacy network
create table if not exists pharmacies (
  id text primary key,
  slug text not null unique,
  name text not null,
  tagline text not null default '',
  description text not null default '',
  about text not null default '',
  status text not null default 'draft',
  listed boolean not null default false,
  featured boolean not null default false,
  owner_user_id text,
  email text not null default '',
  phone text not null default '',
  whatsapp text not null default '',
  street text not null default '',
  city text not null default '',
  county text not null default '',
  country text not null default 'Kenya',
  zip text not null default '',
  latitude double precision,
  longitude double precision,
  maps_embed_url text not null default '',
  logo_url text not null default '',
  cover_image_url text not null default '',
  delivery_notes text not null default '',
  delivery_fee_kes integer not null default 0,
  licence_number text not null default '',
  reject_reason text not null default '',
  insurance text not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  listed_at timestamptz
);

create index if not exists pharmacies_status_listed_idx on pharmacies (status, listed);
create index if not exists pharmacies_city_idx on pharmacies (city);

create table if not exists pharmacy_hours (
  id text primary key,
  pharmacy_id text not null references pharmacies(id) on delete cascade,
  sort_order integer not null default 0,
  day text not null,
  time text not null
);
create index if not exists pharmacy_hours_pharmacy_idx on pharmacy_hours (pharmacy_id);

create table if not exists pharmacy_images (
  id text primary key,
  pharmacy_id text not null references pharmacies(id) on delete cascade,
  sort_order integer not null default 0,
  url text not null,
  alt text not null default '',
  caption text not null default ''
);
create index if not exists pharmacy_images_pharmacy_idx on pharmacy_images (pharmacy_id);

create table if not exists pharmacy_team (
  id text primary key,
  pharmacy_id text not null references pharmacies(id) on delete cascade,
  sort_order integer not null default 0,
  name text not null,
  role text not null,
  bio text not null default '',
  photo_url text not null default ''
);
create index if not exists pharmacy_team_pharmacy_idx on pharmacy_team (pharmacy_id);

create table if not exists user_profiles (
  user_id text primary key,
  display_name text not null default '',
  phone text not null default '',
  platform_admin boolean not null default false,
  active_staff_pharmacy_id text,
  created_at timestamptz not null default now()
);

create table if not exists pharmacy_memberships (
  id text primary key,
  pharmacy_id text not null references pharmacies(id) on delete cascade,
  user_id text not null,
  role text not null default 'staff',
  created_at timestamptz not null default now(),
  unique (pharmacy_id, user_id)
);
create index if not exists pharmacy_memberships_user_idx on pharmacy_memberships (user_id);

create table if not exists customer_pharmacies (
  pharmacy_id text not null references pharmacies(id) on delete cascade,
  user_id text not null,
  loyalty_points integer not null default 0,
  loyalty_tier text not null default 'Member',
  created_at timestamptz not null default now(),
  primary key (pharmacy_id, user_id)
);

create table if not exists services (
  id text primary key,
  pharmacy_id text not null references pharmacies(id) on delete cascade,
  slug text not null,
  title text not null,
  short text not null default '',
  description text not null default '',
  image_url text not null default '',
  duration text not null default '',
  published boolean not null default true,
  unique (pharmacy_id, slug)
);
create index if not exists services_pharmacy_idx on services (pharmacy_id);

create table if not exists medicines (
  id text primary key,
  slug text not null unique,
  name text not null,
  generic_name text not null default '',
  category text not null,
  category_slug text not null,
  description text not null default '',
  form text not null default '',
  strength text not null default '',
  image_url text not null default ''
);

create table if not exists pharmacy_inventory (
  pharmacy_id text not null references pharmacies(id) on delete cascade,
  medicine_id text not null references medicines(id) on delete cascade,
  price_kes integer not null default 0,
  stock_status text not null default 'in_stock',
  listed boolean not null default true,
  sku text not null default '',
  primary key (pharmacy_id, medicine_id)
);

create table if not exists health_articles (
  id text primary key,
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  category text not null default '',
  read_time text not null default '5 min',
  author text not null default '',
  image_url text not null default '',
  content text not null default '[]',
  published boolean not null default true
);

create table if not exists refill_requests (
  id text primary key,
  pharmacy_id text not null references pharmacies(id) on delete cascade,
  user_id text,
  guest_name text not null default '',
  guest_phone text not null default '',
  medication text not null,
  notes text not null default '',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
create index if not exists refill_requests_pharmacy_idx on refill_requests (pharmacy_id, created_at desc);

create table if not exists enquiries (
  id text primary key,
  pharmacy_id text not null references pharmacies(id) on delete cascade,
  name text not null,
  email text not null default '',
  phone text not null default '',
  subject text not null default 'General',
  message text not null,
  status text not null default 'open',
  created_at timestamptz not null default now()
);
create index if not exists enquiries_pharmacy_idx on enquiries (pharmacy_id, created_at desc);

create table if not exists orders (
  id text primary key,
  pharmacy_id text not null references pharmacies(id) on delete cascade,
  user_id text,
  guest_name text not null default '',
  guest_phone text not null default '',
  status text not null default 'received',
  total_kes integer not null default 0,
  items text not null default '[]',
  created_at timestamptz not null default now()
);
create index if not exists orders_pharmacy_idx on orders (pharmacy_id, created_at desc);
