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
ALTER TABLE room ADD COLUMN price INT NOT NULL;
ALTER TABLE room ADD COLUMN geo GEOMETRY;

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
INSERT INTO review (star_rating, comment, user_id, room_id) VALUES
	(5, '房间非常好，床睡得舒服， 干净又卫生，设备齐全', 1, 62136475),
	(5, '位置非常好，服务很好，周边还有好吃好玩的', 1, 62136475),
	(5, '环境优美，住得很舒服，位置好', 1, 166746036),
	(5, '环境优美，住得很舒服，位置好', 2, 62136475);
ALTER TABLE review RENAME COLUMN createAt TO create_at;
ALTER TABLE review RENAME COLUMN updateAt TO update_at;
ALTER TABLE review RENAME COLUMN starRating TO star_rating;
ALTER TABLE review RENAME COLUMN userId TO user_id;
ALTER TABLE review RENAME COLUMN roomId TO room_id;
ALTER TABLE review MODIFY star_rating DECIMAL(2, 1) NOT NULL;

-- room_picture
ALTER TABLE room_picture RENAME COLUMN createAt TO create_at;
ALTER TABLE room_picture RENAME COLUMN updateAt TO update_at;
ALTER TABLE room_picture RENAME COLUMN roomId TO room_id;




-- query
SELECT
  r.id, r.name, r.introduce, r.create_at createAt, r.update_at updateAt,
 	JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) landlord,
	JSON_ARRAYAGG(rp.url) pictureUrls,
  JSON_ARRAYAGG(rt.name) typeTab,
	JSON_ARRAYAGG(JSON_OBJECT(
		'id', re.id, 'starRating', re.star_rating,
		'comment', re.comment, 'createAt', re.create_at,
		'user', JSON_OBJECT('id', reu.id, 'name', reu.name, 'avatarUrl', reu.avatar_url)
	)) reviews
FROM room r
LEFT JOIN user u ON u.id = r.user_id
LEFT JOIN room_picture rp ON r.id = rp.room_id
LEFT JOIN r_room_room_type_tab rrt ON r.id = rrt.room_id
LEFT JOIN room_type_tab rt ON rrt.room_type_tab_id = rt.id
LEFT JOIN review re ON r.id = re.room_id
LEFT JOIN user reu ON reu.id = re.user_id
WHERE r.id = 62136475
GROUP BY r.id;



SELECT
	r.id, r.name, r.introduce, r.address, r.price,
	JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUel', u.avatar_url) landlord
FROM room r
LEFT JOIN user u ON r.user_id = u.id
WHERE r.region_id = 13;

SELECT JSON_ARRAYAGG(url) pictureUrls FROM room_picture WHERE room_id = 62136475;

SELECT JSON_ARRAYAGG(rt.name) typeTabs
FROM r_room_room_type_tab rrt
LEFT JOIN room_type_tab rt ON rt.id = rrt.room_type_tab_id
WHERE rrt.room_id = 62136475;

SELECT
	ROUND(AVG(r.star_rating), 1) starRating, COUNT(*) reviewsCount,
	JSON_ARRAYAGG(
		JSON_OBJECT('id', r.id, 'star_rating', r.star_rating,
			'comment', r.comment, 'createAt', r.create_at,
			'user', JSON_OBJECT('id', u.id, 'name', u.name, 'avatar_url', u.avatar_url))
	) reviews
FROM review r
LEFT JOIN user u ON r.user_id = u.id
WHERE room_id = 62136475;



-- POINT(111.947966 21.612355)
-- POINT(111.94866 21.61243)
-- 通过房间经纬度找地区
SELECT id, deep, name, ext_path FROM area
WHERE ST_Intersects(polygon, ST_GeomFromText('POINT(111.947966 21.612355)',0))=1;

-- 通过地区经纬度找房间
select * from room where ST_Intersects((select polygon from area where name='江城区'), geo)=1;















