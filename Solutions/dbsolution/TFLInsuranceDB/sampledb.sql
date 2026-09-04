
INSERT INTO roles (role_name)
VALUES
('Admin'),
('Manager'),
('Customer'),
('Agent'),
('PolicyOfficer'),
('ClaimsOfficer'),
('AccountsOfficer');


INSERT INTO insurance_products
(   product_code, product_name, description, minimum_age, maximum_age, minimum_term, maximum_term )
VALUES
(  'LP001', 'Life Protection Plan', 'Life protection insurance product', 18, 60, 10, 30 ),
(  'CH001', 'Child Future Plan', 'Long term child protection and savings plan', 18, 55, 10, 25),
(  'RP001', 'Retirement Plan', 'Retirement and pension oriented insurance plan', 25, 60, 10, 30);