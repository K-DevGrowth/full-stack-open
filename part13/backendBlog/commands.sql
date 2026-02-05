CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL CHECK (url <> ''),
  title TEXT NOT NULL CHECK (title <> ''),
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES (
  'Kdev',
  'http://youtube/@kdev6',
  'Sequelize',
  2
);

SELECT id, author, url, title, likes
FROM blogs;
