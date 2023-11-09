CREATE TABLE IF NOT EXISTS dx_waiting.owner(
    owner_id INT NOT NULL AUTO_INCREMENT,
    url VARCHAR(512),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dx_waiting.customer(
    customer_id INT NOT NULL AUTO_INCREMENT,
    position INT,
    status VARCHAR(128),
    date VARCHAR(256),
    firebase_token VARCHAR(256),
    owner_id INT,
    PRIMARY KEY (customer_id),
    foreign key (owner_id) references dx_waiting.owner(owner_id)
);