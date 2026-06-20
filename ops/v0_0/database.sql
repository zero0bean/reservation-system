drop table if exists reservation_status_histories;
drop table if exists reservations;
drop table if exists reservation_slots;
drop table if exists reservable_resources;
drop table if exists users;


create table users (
    id uuid primary key,
    name varchar(100),
    email varchar(100) unique,
    created_at timestamp default now(),
    updated_at timestamp default now()
);

create table reservable_resources (
    id uuid primary key,
    title varchar(50),
    description varchar(200),
    status varchar(50) default 'ACTIVE',
    created_at timestamp default now(),
    updated_at timestamp default now()
);

create table reservation_slots (
    id uuid primary key,
    resource_id uuid references reservable_resources(id),
    start_at timestamp,
    end_at timestamp,
    capacity int,
    remaining int,
    version int default 0,
    created_at timestamp default now(),
    updated_at timestamp default now()
);

create table reservations (
    id uuid primary key,
    user_id uuid references users(id),
    status varchar(50) default 'PENDING',
    created_at timestamp default now(),
    updated_at timestamp default now()
);

create table reservation_status_histories (
    id uuid primary key,
    reservation_id uuid references reservations(id),
    reason text,
    before_status varchar(50),
    after_status varchar(50),
    created_at timestamp default now()
);

