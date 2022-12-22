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

CREATE TABLE IF NOT EXISTS `room`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	introduction VARCHAR(800),
	address VARCHAR(255) NOT NULL,
	area_name VARCHAR(100) NOT NULL,
	price INT NOT NULL,
	type VARCHAR(10) NOT NULL,
	cover_url VARCHAR(255),
	geo GEOMETRY NOT NULL,
	user_id INT NOT NULL,
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	
	FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `room_bed_type`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(10) NOT NULL UNIQUE,
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `room_room_bed_type`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	room_id INT NOT NULL,
	bed_id INT NOT NULL,
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	
	FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (bed_id) REFERENCES room_bed_type(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `room_review`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	star_rating DECIMAL(2, 1) NOT NULL,
	comment VARCHAR(255) NOT NULL,
	user_id INT NOT NULL,
	room_id INT NOT NULL,
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	
	FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `room_picture`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	url VARCHAR(255) NOT NULL,
	filename VARCHAR(255) NOT NULL,
	mimetype VARCHAR(100) NOT NULL,
	size BIGINT NOT NULL,
	room_id INT NOT NULL,
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	
	FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE CASCADE ON UPDATE CASCADE
);



-- user
-- INSERT INTO user (name, password, cellphone, introduction, avatarUrl) VALUES ('coderhxl2', 'coderhxl001', '13680688888', '你好啊', Null);
ALTER TABLE user RENAME COLUMN avatarUrl TO avatar_url;
ALTER TABLE user RENAME COLUMN createAt TO create_at;
ALTER TABLE user RENAME COLUMN updateAt TO update_at;

-- -- room
-- INSERT INTO room (name, introduction, address, area_name, price, type, geo, user_id)
-- VALUES ('test', 'test', 'test', 'test', 100, 'test', ST_GeomFromText('POINT(111.88955 21.590996)', 0), 1);
ALTER TABLE room MODIFY introduction VARCHAR(10000);

-- room_bed_type
INSERT INTO room_bed_type (name) 
VALUES ('单人房'), ('双床房'), ('三人间'), ('大床房'), ('床位');


-- r_room_room_type_tab

-- review
INSERT INTO review (star_rating, comment, user_id, room_id) VALUES 
	(5, '房间非常好，床睡得舒服， 干净又卫生，设备齐全', 1, 62136475), 
	(5, '位置非常好，服务很好，周边还有好吃好玩的', 1, 62136475),
	(5, '环境优美，住得很舒服，位置好', 1, 166746036),
	(5, '环境优美，住得很舒服，位置好', 2, 62136475);

-- room_picture





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
SELECT * FROM room WHERE ST_Intersects((SELECT polygon FROM area WHERE name='阳江市'), geo)=1;


SELECT id, name, ext_path FROM area WHERE ext_path LIKE '%广州%' AND deep = 2;


UPDATE room SET cover_url = '1' WHERE id = 6311787;










