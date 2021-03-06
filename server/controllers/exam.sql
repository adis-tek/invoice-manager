SELECT
    *
FROM
    invoice
    RIGHT OUTER JOIN bill_from ON invoice.bill_from_id = bill_from.bill_from_id
    RIGHT OUTER JOIN bill_to ON invoice.bill_to_id = bill_to.bill_to_id
    RIGHT OUTER JOIN bill_info ON invoice.bill_info_id = bill_info.bill_info_id
    RIGHT OUTER JOIN item_list ON invoice.item_list_id = item_list.item_list_id
ALTER TABLE
    invoice
ADD
    COLUMN status VARCHAR(50) NOT NULL DEFAULT 'pending';

UPDATE
    bill_from
SET
    street_address = 'street2',
    city = 'city2',
    postal_code = '60661',
    country = 'country2'
WHERE
    bill_from_id = 1;

ALTER TABLE
    identity DROP COLUMN username;

ALTER TABLE
    account_user DROP COLUMN profile_id;

ALTER TABLE
    profile DROP COLUMN first_name;

ALTER TABLE
    profile DROP COLUMN last_name;

ALTER TABLE
    account_user
ADD
    COLUMN email VARCHAR(255);

ALTER TABLE
    account_user
ADD
    COLUMN password VARCHAR(255);

ALTER TABLE
    account_user
ADD
    COLUMN photo BYTEA;

INSERT INTO
    account_user(
        account_user_uuid,
        created_at,
        last_login,
        email,
        password,
        photo
    )
VALUES
    ($ 1, $ 2, $ 3, $ 4, $ 5, $ 6) RETURNING * [uuid_generate_v4(), CURRENT_DATE, CURRENT_TIMESTAMP, email, hashedPassword, photo]
);

insert into
    account_user (
        account_user_uuid,
        created_at,
        last_login,
        email,
        password,
        photo
    )
values
    (
        uuid_generate_v4(),
        CURRENT_DATE,
        CURRENT_TIMESTAMP,
        'adis@adis.com',
        'thisisapassword',
        null
    );

insert into
    account_user (
        account_user_uuid,
        created_at,
        last_login,
        email,
        password,
        photo
    )
values
    (
        uuid_generate_v4(),
        CURRENT_DATE,
        CURRENT_TIMESTAMP,
        null,
        null,
        null
    );

UPDATE
    account_user
SET
    (email, password, photo) = ('adismail@mail.com', 'testpass', null)
WHERE
    account_user_uuid = '95363623-047c-4b31-bf46-6bd370a2a800';

UPDATE
    account_user
SET
    (email, password, photo) = ('adis00@gmail.com', 'testpass', null)
WHERE
    account_user_uuid = '70f32842-a298-4bf0-88c2-42532f8fcacd';

UPDATE
    invoice
SET
    (account_user_uuid) = ('4c9deba8-a6bf-4467-ac56-0dd9b2ef0102')
WHERE
    account_user_uuid = '70f32842-a298-4bf0-88c2-42532f8fcacd';