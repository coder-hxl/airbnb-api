CREATE DATABASE airbnb;



-- create
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

CREATE TABLE IF NOT EXISTS `region`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL UNIQUE,
	type INT NOT NULL,
	parentId INT,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

	FOREIGN KEY (parentId) REFERENCES region(id) ON DELETE CASCADE ON UPDATE CASCADE
);

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

CREATE TABLE IF NOT EXISTS `room_type_tab`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(10) NOT NULL UNIQUE,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `r_room_room_type_tab`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	roomId INT NOT NULL,
	roomTypeTabId INT NOT NULL,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

	FOREIGN KEY (roomId) REFERENCES room(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (verifyTabId) REFERENCES verify_tab(id) ON DELETE CASCADE ON UPDATE CASCADE
);

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



-- user
-- INSERT INTO user (name, password, cellphone, introduction, avatarUrl) VALUES ('coderhxl2', 'coderhxl001', '13680688888', '你好啊', Null);
ALTER TABLE user RENAME COLUMN avatarUrl TO avatar_url;
ALTER TABLE user RENAME COLUMN createAt TO create_at;
ALTER TABLE user RENAME COLUMN updateAt TO update_at;

-- region
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
ALTER TABLE region RENAME COLUMN parentId TO parent_id;
ALTER TABLE region RENAME COLUMN createAt TO create_at;
ALTER TABLE region RENAME COLUMN updateAt TO update_at;

-- room
ALTER TABLE room RENAME COLUMN createAt TO create_at;
ALTER TABLE room RENAME COLUMN updateAt TO update_at;
ALTER TABLE room RENAME COLUMN userId TO user_id;
ALTER TABLE room RENAME COLUMN regionId TO region_id;

-- room_type_tab
-- INSERT INTO room_type_tab (name) VALUES ('公寓');
-- INSERT INTO room_type_tab (name) VALUES ('酒店');
-- INSERT INTO room_type_tab (name) VALUES ('别墅');
ALTER TABLE room_type_tab RENAME COLUMN createAt TO create_at;
ALTER TABLE room_type_tab RENAME COLUMN updateAt TO update_at;

-- r_room_room_type_tab
ALTER TABLE r_room_room_type_tab RENAME COLUMN createAt TO create_at;
ALTER TABLE r_room_room_type_tab RENAME COLUMN updateAt TO update_at;
ALTER TABLE r_room_room_type_tab RENAME COLUMN roomId TO room_id;
ALTER TABLE r_room_room_type_tab RENAME COLUMN roomTypeTabId TO room_type_tab_id;

-- review
ALTER TABLE review RENAME COLUMN createAt TO create_at;
ALTER TABLE review RENAME COLUMN updateAt TO update_at;
ALTER TABLE review RENAME COLUMN starRating TO star_rating;
ALTER TABLE review RENAME COLUMN userId TO user_id;
ALTER TABLE review RENAME COLUMN roomId TO room_id;

-- room_picture
ALTER TABLE room_picture RENAME COLUMN createAt TO create_at;
ALTER TABLE room_picture RENAME COLUMN updateAt TO update_at;
ALTER TABLE room_picture RENAME COLUMN roomId TO room_id;




-- query
SELECT
  r.id, r.name, r.introduce, r.create_at createAt, r.update_at updateAt,
 	JSON_ARRAYAGG(rp.url) pictureUrls,
 	JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) landlord,
  JSON_ARRAYAGG(rtt.name) message
FROM room r
LEFT JOIN room_picture rp ON r.id = rp.room_id
LEFT JOIN user u ON u.id = r.user_id
LEFT JOIN r_room_room_type_tab rrt ON r.id = rrt.room_id
LEFT JOIN room_type_tab rtt ON rrt.room_type_tab_id = rtt.id
WHERE r.id = 62136475
GROUP BY r.id;

-- 80823792

SELECT
  r.id, r.name, r.introduce, r.create_at createAt, r.update_at updateAt,
 	JSON_ARRAYAGG(rp.url) pictureUrls,
--  	JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) landlord,
  JSON_ARRAYAGG(rtt.name) message
FROM room r
LEFT JOIN
	(room_picture rp, user u, r_room_room_type_tab rrt, room_type_tab rtt)
	ON
	(rp.room_id = r.id AND u.id = r.user_id AND r.id = rrt.room_id AND rrt.room_type_tab_id = rtt.id)
WHERE r.id = 62136475
GROUP BY r.id;

SELECT * FROM r_room_room_type_tab r WHERE r.room_id = 62136475;



SELECT
	r.id, r.name,
	JSON_ARRAYAGG(
		JSON_OBJECT(
			'id', ro.id, 'name', ro.name, 'pictures',
			(SELECT JSON_ARRAYAGG(rp.url) FROM room_picture rp WHERE rp.room_id = ro.id)
		)
	) rooms
FROM region r
LEFT JOIN room ro ON ro.region_id = r.id
WHERE r.parent_id = 4
GROUP BY r.id;
















