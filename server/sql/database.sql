CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE invoice_manager;

/* TESTING */
CREATE TABLE invoice_test (
    invoice_id uuid DEFAULT uuid_generate_v4 (),
    total decimal DEFAULT 19.99
);

insert into
    invoice_test (invoice_id, total)
values
    (DEFAULT, DEFAULT);

/* OFFICIAL */
CREATE TABLE account_user(
    account_user_uuid uuid DEFAULT uuid_generate_v4 (),
    profile_id BIGSERIAL NOT NULL,
    identity_id BIGSERIAL NOT NULL,
    created_at date NOT NULL DEFAULT CURRENT_DATE,
    last_login timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (account_user_uuid),
    FOREIGN KEY (profile_id) REFERENCES profile(profile_id),
    FOREIGN KEY (identity_id) REFERENCES identity(profile_id)
);

CREATE TABLE profile(
    profile_id BIGSERIAL NOT NULL PRIMARY KEY,
    account_user_uuid uuid,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    profile_picture BYTEA,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    last_login timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_user_uuid) REFERENCES account_user(account_user_uuid)
);

CREATE TABLE identity(
    identity_id BIGSERIAL NOT NULL PRIMARY KEY,
    account_user_uuid uuid,
    username VARCHAR(100),
    email VARCHAR(200),
    password VARCHAR(100),
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    last_login timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_user_uuid) REFERENCES account_user(account_user_uuid)
);

/* SECOND LAYER INVOICE SECTION */
CREATE TABLE invoice(
    invoice_id BIGSERIAL NOT NULL PRIMARY KEY,
    account_user_uuid uuid,
    bill_from_id BIGSERIAL,
    bill_to_id BIGSERIAL,
    bill_info_id BIGSERIAL,
    item_list_id BIGSERIAL,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bill_from_id) REFERENCES bill_from(bill_from_id),
    FOREIGN KEY (bill_to_id) REFERENCES bill_to(bill_to_id),
    FOREIGN KEY (bill_info_id) REFERENCES bill_info(bill_info_id),
    FOREIGN KEY (item_list_id) REFERENCES item_list(item_list_id),
    FOREIGN KEY (account_user_uuid) REFERENCES account_user(account_user_uuid)
);

CREATE TABLE bill_from(
    bill_from_id BIGSERIAL NOT NULL PRIMARY KEY,
    street_address VARCHAR(255),
    city VARCHAR(100),
    postal_code INTEGER,
    country VARCHAR(50)
);

CREATE TABLE bill_to(
    bill_to_id BIGSERIAL NOT NULL PRIMARY KEY,
    clients_name VARCHAR(100),
    clients_email VARCHAR(100),
    street_address VARCHAR(255),
    city VARCHAR(100),
    postal_code NUMERIC(50),
    country VARCHAR(50)
);

CREATE TABLE bill_info(
    bill_info_id BIGSERIAL NOT NULL PRIMARY KEY,
    invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_terms INTEGER NOT NULL DEFAULT 1,
    project_description VARCHAR(255)
);

CREATE TABLE item_list(
    item_list_id BIGSERIAL NOT NULL PRIMARY KEY,
    item_name VARCHAR(100),
    quantity INTEGER NOT NULL DEFAULT 1,
    price MONEY NOT NULL DEFAULT 1.00
);

/*VALUE INPUT 
 
 insert into
 invoice_test (invoice_id, total)
 values
 (uuid_generate_v4(), 99.99);
 
 insert into
 invoice_test (invoice_id, total)
 values
 (uuid_generate_v4(), 88.88);
 
 insert into
 invoice_test (invoice_id, total)
 values
 (uuid_generate_v4(), 77.77);
 
 
 insert into
 account_user (account_user_uuid, profile_id, identity_id, created_at, last_login)
 values
 (uuid_generate_v4(), 1, 1, CURRENT_DATE, CURRENT_TIMESTAMP),
 (uuid_generate_v4(), 2, 2, CURRENT_DATE, CURRENT_TIMESTAMP),
 (uuid_generate_v4(), 3, 3, CURRENT_DATE, CURRENT_TIMESTAMP);
 
 insert into
 profile (profile_id, account_user_uuid, first_name, last_name, profile_picture, created_at, last_login)
 values
 (1, (SELECT account_user_uuid from account_user WHERE profile_id=1), 'Dave', 'Port', NULL, CURRENT_DATE, CURRENT_TIMESTAMP),
 (2, (SELECT account_user_uuid from account_user WHERE profile_id=2), 'Jack', 'Smith', NULL, CURRENT_DATE, CURRENT_TIMESTAMP),
 (3, (SELECT account_user_uuid from account_user WHERE profile_id=3), 'John', 'Snow', NULL, CURRENT_DATE, CURRENT_TIMESTAMP);
 
 insert into
 identity (identity_id, account_user_uuid, username, email, password, created_at, last_login)
 values
 (1, (SELECT account_user_uuid from account_user WHERE profile_id=1), 'shail', 'ghoul@gmail.com', 'ghoul35', CURRENT_DATE, CURRENT_TIMESTAMP),
 (2, (SELECT account_user_uuid from account_user WHERE profile_id=2), "brail", "rob@gmail.com", "rob4200", CURRENT_DATE, CURRENT_TIMESTAMP),
 (3, (SELECT account_user_uuid from account_user WHERE profile_id=3), "snail", "calgary@gmail.com", "calgaryeggs", CURRENT_DATE, CURRENT_TIMESTAMP);
 
 
 DELETE FROM account_user
 WHERE profile_id = 1;
 
 DELETE FROM profile
 WHERE profile_id = 1;
 
 (SELECT account_user_uuid from account_user WHERE profile_id=1)
 
 
 insert into
 identity (identity_id, account_user_uuid, username, email, password, created_at, last_login)
 values
 (1, (SELECT account_user_uuid from account_user WHERE profile_id=1), 'shail', 'ghoul@gmail.com', 'ghoul35', CURRENT_DATE, CURRENT_TIMESTAMP);
 
 insert into
 invoice ( invoice_id, account_user_uuid, bill_from_id, bill_to_id, bill_info_id, item_list_id, updated_at )
 values
 (2, (SELECT account_user_uuid from account_user WHERE profile_id=1), 2, 2, 2, 2, CURRENT_TIMESTAMP);
 
 insert into
 bill_from ( bill_from_id, street_address, city, postal_code, country)
 values
 (2, 'street1', 'city1', 60660, 'country1');
 
 insert into
 bill_to (bill_to_id, clients_name, clients_email, street_address, city, postal_code, country)
 values
 (2, 'name1', 'email1', 'client-street1', 'client-city1', 60661, 'client-country1');
 
 insert into
 bill_info (bill_info_id, invoice_date, payment_terms, project_description)
 values
 (2, DEFAULT, DEFAULT, 'description1');
 
 insert into
 item_list (item_list_id, item_name, quantity, price)
 values
 (2, 'item1', DEFAULT, DEFAULT);
 
 */