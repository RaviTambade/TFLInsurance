CREATE DATABASE TflInsurance_db;

USE TflInsurance_db;

CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(500) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL
);

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),

    CONSTRAINT fk_user_roles_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id),

    CONSTRAINT fk_user_roles_role
        FOREIGN KEY (role_id)
        REFERENCES roles(role_id)
);

CREATE TABLE customers (
    customer_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    customer_number VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(255),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL,

    CONSTRAINT fk_customer_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);

CREATE TABLE agents (
    agent_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    agent_code VARCHAR(50) NOT NULL UNIQUE,
    license_number VARCHAR(100) NOT NULL UNIQUE,
    joining_date DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_agent_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);


CREATE TABLE insurance_products (
    product_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_code VARCHAR(50) NOT NULL UNIQUE,
    product_name VARCHAR(200) NOT NULL,
    description TEXT,
    minimum_age INT,
    maximum_age INT,
    minimum_term INT,
    maximum_term INT,
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL
);

CREATE TABLE proposals (
    proposal_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    proposal_number VARCHAR(50) NOT NULL UNIQUE,
    customer_id BIGINT NOT NULL,
    agent_id BIGINT NULL,
    product_id BIGINT NOT NULL,
    sum_assured DECIMAL(18,2) NOT NULL,
    policy_term INT NOT NULL,
    premium_amount DECIMAL(18,2) NOT NULL,
    premium_frequency VARCHAR(20) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Draft',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    submitted_at DATETIME NULL,
    approved_at DATETIME NULL,
    rejected_at DATETIME NULL,

    CONSTRAINT fk_proposal_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    CONSTRAINT fk_proposal_agent FOREIGN KEY (agent_id) REFERENCES agents(agent_id),
    CONSTRAINT fk_proposal_product FOREIGN KEY (product_id) REFERENCES insurance_products(product_id)
);

CREATE TABLE proposal_documents (
    proposal_document_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    proposal_id BIGINT NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(1000) NOT NULL,
    verification_status VARCHAR(30) NOT NULL DEFAULT 'Pending',
    uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    verified_at DATETIME NULL,
    CONSTRAINT fk_proposal_document_proposal FOREIGN KEY (proposal_id) REFERENCES proposals(proposal_id)
);

CREATE TABLE policies (
    policy_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    policy_number VARCHAR(50) NOT NULL UNIQUE,
    proposal_id BIGINT NOT NULL UNIQUE,
    customer_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    agent_id BIGINT NULL,
    sum_assured DECIMAL(18,2) NOT NULL,
    premium_amount DECIMAL(18,2) NOT NULL,
    premium_frequency VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    maturity_date DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Issued',
    issued_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL,
    CONSTRAINT fk_policy_proposal FOREIGN KEY (proposal_id) REFERENCES proposals(proposal_id),
    CONSTRAINT fk_policy_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    CONSTRAINT fk_policy_product FOREIGN KEY (product_id) REFERENCES insurance_products(product_id),
    CONSTRAINT fk_policy_agent FOREIGN KEY (agent_id) REFERENCES agents(agent_id)
);


CREATE TABLE policy_nominees (
    policy_nominee_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    policy_id BIGINT NOT NULL,
    name VARCHAR(200) NOT NULL,
    relationship VARCHAR(100),
    date_of_birth DATE,
    percentage_share DECIMAL(5,2),
    phone VARCHAR(20),
    address VARCHAR(500),
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    CONSTRAINT fk_nominee_policy FOREIGN KEY (policy_id) REFERENCES policies(policy_id)
);

CREATE TABLE premiums (
    premium_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    policy_id BIGINT NOT NULL,
    installment_number INT NOT NULL,
    due_date DATE NOT NULL,
    amount DECIMAL(18,2) NOT NULL,
    paid_amount DECIMAL(18,2) NOT NULL DEFAULT 0,
    paid_date DATETIME NULL,
    late_fee DECIMAL(18,2) NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'Due',
    CONSTRAINT fk_premium_policy FOREIGN KEY (policy_id) REFERENCES policies(policy_id),
    CONSTRAINT uq_policy_installment UNIQUE (policy_id, installment_number)
);

CREATE TABLE payments (
    payment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    premium_id BIGINT NOT NULL,
    policy_id BIGINT NOT NULL,
    transaction_reference VARCHAR(100) NOT NULL UNIQUE,
    idempotency_key VARCHAR(100) UNIQUE,
    amount DECIMAL(18,2) NOT NULL,
    payment_method VARCHAR(50),
    payment_date DATETIME NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Initiated',
    gateway_response TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_payment_premium FOREIGN KEY (premium_id) REFERENCES premiums(premium_id),
    CONSTRAINT fk_payment_policy FOREIGN KEY (policy_id) REFERENCES policies(policy_id)
);

CREATE TABLE claims (
    claim_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    claim_number VARCHAR(50) NOT NULL UNIQUE,
    policy_id BIGINT NOT NULL,
    claimant_id BIGINT NOT NULL,
    claim_type VARCHAR(50) NOT NULL,
    claim_amount DECIMAL(18,2),
    status VARCHAR(30) NOT NULL DEFAULT 'Registered',
    raised_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    approved_at DATETIME NULL,
    rejected_at DATETIME NULL,
    settled_at DATETIME NULL,
    CONSTRAINT fk_claim_policy FOREIGN KEY (policy_id) REFERENCES policies(policy_id),
    CONSTRAINT fk_claim_claimant FOREIGN KEY (claimant_id) REFERENCES customers(customer_id)
);


CREATE TABLE claim_documents (
    claim_document_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    claim_id BIGINT NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(1000) NOT NULL,
    verification_status VARCHAR(30) NOT NULL DEFAULT 'Pending',
    uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    verified_at DATETIME NULL,
    CONSTRAINT fk_claim_document_claim FOREIGN KEY (claim_id) REFERENCES claims(claim_id)
);

CREATE TABLE claim_settlements (
    settlement_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    claim_id BIGINT NOT NULL UNIQUE,
    approved_amount DECIMAL(18,2) NOT NULL,
    settlement_amount DECIMAL(18,2) NOT NULL,
    payment_reference VARCHAR(100),
    settlement_date DATETIME NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Pending',
    processed_by BIGINT NULL, CONSTRAINT fk_settlement_claim FOREIGN KEY (claim_id) REFERENCES claims(claim_id),
    CONSTRAINT fk_settlement_user FOREIGN KEY (processed_by) REFERENCES users(user_id)
);

CREATE TABLE notifications (
    notification_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    notification_type VARCHAR(50) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    channel VARCHAR(30) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Pending',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    sent_at DATETIME NULL,
    CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE audit_logs (
    audit_log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id BIGINT NOT NULL,
    action VARCHAR(100) NOT NULL,
    old_value JSON NULL,
    new_value JSON NULL,
    ip_address VARCHAR(50),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_audit_user   FOREIGN KEY (user_id) REFERENCES users(user_id)
);
