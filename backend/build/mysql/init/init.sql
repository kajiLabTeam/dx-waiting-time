CREATE TABLE IF NOT EXISTS dx_waiting.owners(
    owner_id VARCHAR(128) NOT NULL,
    owner_name VARCHAR(128),
    PRIMARY KEY (owner_id)
);

CREATE TABLE IF NOT EXISTS dx_waiting.customers(
    customer_id INT NOT NULL AUTO_INCREMENT,
    position INT,
    waiting_status VARCHAR(128),
    date DATETIME,
    firebase_token VARCHAR(256),
    owner_id VARCHAR(128),
    PRIMARY KEY (customer_id),
    foreign key (owner_id) references dx_waiting.owners(owner_id)
);

INSERT INTO dx_waiting.owners(owner_id, owner_name)
VALUES
(
    'hogehoge12345hagehage6789','ait-kjlb'
);

/* INSERT QUERY */
INSERT INTO dx_waiting.owners(owner_id, owner_name)
VALUES
(
    'hugahuga8192hakeheke16384','sysken'
);

INSERT INTO dx_waiting.customers(position, waiting_status, date, firebase_token, owner_id)
VALUES
(
    1, 'waiting', NOW(), 'token1', 'hogehoge12345hagehage6789'
),
(
    2, 'waiting', NOW(), 'token2', 'hogehoge12345hagehage6789'
),
(
    3, 'waiting', NOW(), 'token3', 'hogehoge12345hagehage6789'
),
(
    4, 'waiting', NOW(), 'token4', 'hogehoge12345hagehage6789'
),
(
    5, 'waiting', NOW(), 'token5', 'hogehoge12345hagehage6789'
);

INSERT INTO dx_waiting.customers(position, waiting_status, date, firebase_token, owner_id)
VALUES
(
    1, 'waiting', NOW(), 'token6', 'hugahuga8192hakeheke16384'
),
(
    2, 'waiting', NOW(), 'token7', 'hugahuga8192hakeheke16384'
),
(
    3, 'waiting', NOW(), 'token8', 'hugahuga8192hakeheke16384'
),
(
    4, 'waiting', NOW(), 'token9', 'hugahuga8192hakeheke16384'
),
(
    5, 'waiting', NOW(), 'token10', 'hugahuga8192hakeheke16384'
);

