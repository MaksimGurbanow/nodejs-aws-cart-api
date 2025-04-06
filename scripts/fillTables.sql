drop table if exists cart_items cascade;
drop table if exists carts cascade;
drop table if exists users cascade;

drop type if exists cart_status;

create type cart_status as ENUM('OPEN', 'ORDERED');

create table users (
    id UUID primary key,
    email VARCHAR(255) not null unique,
    password VARCHAR(255) not null,
    created_at TIMESTAMP not null default CURRENT_DATE,
    updated_at TIMESTAMP not null default CURRENT_DATE
);

create table carts (
    id UUID primary key,
    user_id UUID not null,
    created_at TIMESTAMP not null default CURRENT_DATE,
    updated_at TIMESTAMP not null default CURRENT_DATE,
    status cart_status not null default 'OPEN',
    foreign key (user_id) references users(id)
);

create table cart_items (
    cart_id UUID not null,
    product_id UUID not null,
    count INTEGER not null check (count > 0),
    primary key (cart_id, product_id),
    foreign key (cart_id) references carts(id)
);

insert into users (id, email, password, created_at, updated_at) values
('5750bf4b-f465-4ae7-bc82-5cb07b742fc1', 'user1@example.com', 'password123', now(), now()),
('b730bed5-d6a0-4c56-a3a6-c881b6e348cd', 'user2@example.com', 'password456', now(), now());

insert into carts (id, user_id, created_at, updated_at, status) values
(
    'b1d02e13-0e33-4a0c-ab07-d7e9330b2fa6', 
    '5750bf4b-f465-4ae7-bc82-5cb07b742fc1', 
    now(), 
    now(), 
    'OPEN'
),
(
    'a37e1b6c-4b88-4c3e-88f7-caf4c89a7b83', 
    'b730bed5-d6a0-4c56-a3a6-c881b6e348cd', 
    now(), now(), 
    'ORDERED'
);

insert into cart_items (cart_id, product_id, count) values
(
    'b1d02e13-0e33-4a0c-ab07-d7e9330b2fa6', 
    '98b25b9f-8ec3-468a-b278-16d699fae8b2', 
    2
),
(
    'b1d02e13-0e33-4a0c-ab07-d7e9330b2fa6', 
    'd03fd111-8105-467e-b18d-38d7b3c108e9', 
    1
),
(
    'a37e1b6c-4b88-4c3e-88f7-caf4c89a7b83', 
    '98b25b9f-8ec3-468a-b278-16d699fae8b2', 
    3
);

