CREATE TABLE IF NOT EXISTS dx_waiting.owner(
    id INT NOT NULL AUTO_INCREMENT,
    url VARCHAR(512),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dx_waiting.customer(
    id INT NOT NULL AUTO_INCREMENT,
    number INT,
    status VARCHAR(128),
    date VARCHAR(256),
    firebase_token VARCHAR(256),
    owner_id INT,
    PRIMARY KEY (id),
    foreign key (owner_id) references dx_waiting.owner(ID)
);