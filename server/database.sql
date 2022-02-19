CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE invoice_manager;

CREATE TABLE "user"(
    user_id uuid DEFAULT uuid_generate_v4 (),
    PRIMARY KEY (user_id)
);

CREATE TABLE invoice_test(
    invoice_id uuid DEFAULT uuid_generate_v4 (),
    total decimal,
    PRIMARY KEY (invoice_id)
);

insert into invoice_test (invoice_id, total)
values (uuid_generate_v4(), 99.99);

insert into invoice_test (invoice_id, total)
values (uuid_generate_v4(), 88.88);

insert into invoice_test (invoice_id, total)
values (uuid_generate_v4(), 77.77);