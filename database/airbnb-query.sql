CREATE DATABASE airbnb;


CREATE TABLE IF NOT EXISTS `user`(
  id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL UNIQUE,
	nickname VARCHAR(20),
	password VARCHAR(255) NOT NULL,
	cellphone BIGINT NOT NULL UNIQUE,
	introduce VARCHAR(255),
	avatarUrl VARCHAR(255),
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- INSERT INTO user (name, password, cellphone, introduction, avatarUrl) VALUES ('coderhxl2', 'coderhxl001', '13680688888', '你好啊', Null);
-- ALTER TABLE user MODIFY cellphone VARCHAR(255) NOT NULL UNIQUE;
-- ALTER TABLE user ADD nickname VARCHAR(20);
-- ALTER TABLE user MODIFY name VARCHAR(20) NOT NULL UNIQUE;
-- ALTER TABLE user CHANGE introduction introduce VARCHAR(255);


CREATE TABLE IF NOT EXISTS `region`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL UNIQUE,
	type INT NOT NULL,
	parentId INT,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

	FOREIGN KEY (parentId) REFERENCES region(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ALTER TABLE region ADD type INT NOT NULL;
-- INSERT INTO region (name, type) VALUES ('中国', 1);
-- INSERT INTO region (name, type, parentId) VALUES ('广东', 2, 1);
-- INSERT INTO region (name, type, parentId) VALUES ('阳江', 3, 2);
-- INSERT INTO region (name, type, parentId) VALUES ('海陵岛', 4, 4);
-- INSERT INTO region (name, type, parentId) VALUES ('敏捷黄金海岸', 4, 4);
-- INSERT INTO region (name, type, parentId) VALUES ('十里银滩', 4, 4);
-- INSERT INTO region (name, type, parentId) VALUES ('北洛秘境', 4, 4);
-- INSERT INTO region (name, type, parentId) VALUES ('月亮湾', 4, 4);
-- INSERT INTO region (name, type, parentId) VALUES ('沙扒湾', 4, 4);
-- INSERT INTO region (name, type, parentId) VALUES ('百利广场', 4, 4);
-- INSERT INTO region (name, type, parentId) VALUES ('广州', 3, 2);
-- INSERT INTO region (name, type, parentId) VALUES ('佛山', 3, 2);
-- INSERT INTO region (name, type, parentId) VALUES ('台湾', 2, 1);
-- INSERT INTO region (name, type, parentId) VALUES ('台北', 3, 7);
-- INSERT INTO region (name, type, parentId) VALUES ('新北', 3, 7);
-- INSERT INTO region (name, type, parentId) VALUES ('湖南', 2, 1);
-- INSERT INTO region (name, type, parentId) VALUES ('长沙', 3, 10);
-- INSERT INTO region (name, type, parentId) VALUES ('永州', 3, 10);


CREATE TABLE IF NOT EXISTS `room`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	address VARCHAR(255) NOT NULL,
	introduce VARCHAR(800),
	userId INT NOT NULL,
	regionId INT NOT NULL,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

	FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (regionId) REFERENCES region(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ALTER TABLE room ADD address VARCHAR(255) NOT NULL;
ALTER TABLE room MODIFY introduce VARCHAR(800);


CREATE TABLE IF NOT EXISTS `room_type_tab`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(10) NOT NULL UNIQUE,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- INSERT INTO room_type_tab (name) VALUES ('公寓');
-- INSERT INTO room_type_tab (name) VALUES ('酒店');
-- INSERT INTO room_type_tab (name) VALUES ('别墅');


CREATE TABLE IF NOT EXISTS `r_room_room_type_tab`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	roomId INT NOT NULL,
	roomTypeTabId INT NOT NULL,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

	FOREIGN KEY (roomId) REFERENCES room(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (verifyTabId) REFERENCES verify_tab(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ALTER TABLE r_room_room_type_tab CHANGE verifyTabId roomTypeTabId INT NOT NULL;


CREATE TABLE IF NOT EXISTS `review`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	starRating INT NOT NULL,
	comment VARCHAR(255) NOT NULL,
	userId INT NOT NULL,
	roomId INT NOT NULL,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

	FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (roomId) REFERENCES room(id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS `room_picture`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	url VARCHAR(255) NOT NULL,
	filename VARCHAR(255) NOT NULL,
	mimetype VARCHAR(100) NOT NULL,
	size BIGINT NOT NULL,
	roomId INT NOT NULL,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

	FOREIGN KEY (roomId) REFERENCES room(id) ON DELETE CASCADE ON UPDATE CASCADE
);











SELECT
	r.id, r.name, JSON_ARRAYAGG(JSON_OBJECT('id', ro.id, 'name', ro.name)) rooms
FROM region r
LEFT JOIN room ro ON ro.regionId = r.id
WHERE r.parentId = 4
GROUP BY r.id;

















