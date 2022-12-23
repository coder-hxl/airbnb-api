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

-- review
INSERT INTO room_review (star_rating, comment, user_id, room_id) VALUES
	(5, '房间非常好，床睡得舒服， 干净又卫生，设备齐全', 1, 169099602),
	(5, '位置非常好，服务很好，周边还有好吃好玩的', 1, 169099602),
	(5, '环境优美，住得很舒服，位置好', 2, 169099602),
	(5, '环境优美，住得很舒服，位置好', 1, 171868687);








-- query

-- 通过 POLYGON + POINT 找位置
SELECT id, deep, name, ext_path FROM area
WHERE ST_Intersects(polygon, ST_GeomFromText('POINT(111.947966 21.612355)',0))=1;


SELECT
	id, name, ext_path, deep,
	(SELECT
		JSON_ARRAYAGG(r.id)
	FROM room r WHERE ST_Intersects(polygon, r.geo)=1) rooms
FROM area WHERE ext_path LIKE '%阳江市%' AND deep = 2;


SELECT
	id, name, ext_path, deep,
	(SELECT
		COUNT(*)
	FROM room r WHERE ST_Intersects(polygon, r.geo)=1) room_count
FROM area WHERE ext_path LIKE '%阳江市%' AND deep = 2;


-- 查询某个房间
SELECT
	r.id, r.name, r.introduction, r.address, r.area_name areaName, r.price,
	r.type, r.cover_url coverUrl, r.geo,
	JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) landlord,
	(SELECT ext_path FROM area WHERE ST_Intersects(polygon, r.geo)=1 AND deep = 2) areaExtPath
FROM room r
LEFT JOIN user u ON u.id = r.user_id
WHERE r.id = 169099602;

SELECT JSON_ARRAYAGG(url) pictureUrls FROM room_picture WHERE room_id = 169099602;

SELECT JSON_ARRAYAGG(rbt.name) bedTypes
FROM room_room_bed_type rrbt
LEFT JOIN room_bed_type rbt ON rbt.id = rrbt.bed_id
WHERE rrbt.room_id = 169099602;

SELECT
	ROUND(AVG(r.star_rating), 1) starRating, COUNT(*) reviewsCount,
	JSON_ARRAYAGG(
		JSON_OBJECT('id', r.id, 'star_rating', r.star_rating,
			'comment', r.comment, 'createAt', r.create_at,
			'user', JSON_OBJECT('id', u.id, 'name', u.name, 'avatar_url', u.avatar_url))
	) reviews
FROM room_review r
LEFT JOIN user u ON r.user_id = u.id
WHERE room_id = 169099602;


-- Home数据
SELECT
	id, name, ext_path, deep,
	(SELECT
		JSON_ARRAYAGG(JSON_OBJECT('id', r.id, 'name', r.name,
		'price', r.price, 'type', r.type, 'coverUrl', r.cover_url))
	FROM room r WHERE ST_Intersects(polygon, r.geo)=1) rooms
FROM area WHERE ext_path LIKE '%阳江市%' AND deep = 2;















