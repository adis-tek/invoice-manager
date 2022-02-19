CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE invoice_manager;

CREATE TABLE "user"(
    user_id uuid DEFAULT uuid_generate_v4 (),
    PRIMARY KEY (user_id)
);