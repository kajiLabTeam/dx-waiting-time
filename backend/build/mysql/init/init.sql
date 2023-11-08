CREATE TABLE IF NOT EXISTS Owner(
    ID INT NOT NULL AUTO_INCREMENT;
    URL VARCHAR(512),
    PRIMARY KEY (ID)
    ) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Customer(
    ID INT NOT NULL AUTO_INCREMENT;
    Number INT;
    Status VARCHAR(128);
    Date VARCHAR(256);
    Firebase_token VARCHAR(256);
    Owner_ID INT;
    PRIMARY KEY (ID);
    foreign key (Owner_ID) references dx-waiting.Owner(ID)
)