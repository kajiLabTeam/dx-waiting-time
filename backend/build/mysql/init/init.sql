CREATE TABLE IF NOT EXISTS dx_waiting.owner(
    owner_id VARCHAR(128) NOT NULL,
    owner_name VARCHAR(128),
    PRIMARY KEY (owner_id)
);

CREATE TABLE IF NOT EXISTS dx_waiting.customer(
    customer_id INT NOT NULL AUTO_INCREMENT,
    position INT,
    waiting_status VARCHAR(128),
    date DATETIME,
    firebase_token VARCHAR(256),
    owner_id VARCHAR(128),
    PRIMARY KEY (customer_id),
    foreign key (owner_id) references dx_waiting.owner(owner_id)
);