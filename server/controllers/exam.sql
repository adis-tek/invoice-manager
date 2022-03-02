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