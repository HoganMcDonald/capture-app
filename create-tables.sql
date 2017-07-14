CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username TEXT NOT NULL,
	email TEXT,
	password_hash TEXT NOT NULL
);

CREATE TABLE buckets(
	id SERIAL PRIMARY KEY,
	bucket_name TEXT NOT NULL,
	bucket_description TEXT,
	user_id INT REFERENCES users
);

CREATE TABLE snippets(
	id SERIAL PRIMARY KEY,
	snippet_content TEXT NOT NULL,
	img_url TEXT,
	tone_info TEXT,
	bucket_id INT REFERENCES buckets
);
