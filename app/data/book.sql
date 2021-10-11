CREATE DATABASE IF NOT EXISTS msisHW;
USE msisHW;

DROP TABLE IF EXISTS book;
CREATE TABLE book (
	id int PRIMARY KEY AUTO_INCREMENT ,
    Title varchar(48) UNIQUE NOT NULL,
    Authors varchar(48)  NOT NULL,
    Year_Published int  NOT NULL,
    Publisher varchar(48)  NOT NULL,
    Page_count int  NOT NULL,
    MSRP varchar(24)  NOT NULL
);

INSERT INTO book (id, Title, Authors, Year_Published, Publisher, Page_count,MSRP) VALUES 
(1, 'Ulysses', 'James Joyce', 1922, "Shakespeare and Company", 730, "$37.95" ),
(2, 'War and Peace', 'Leo Tolstoy', 1869, "Vintage Classics ed.", 1296, "$18.97"),
(3, 'The Great Gatsby', 'F. Scott Fitzgerald', 1925, "Scribner Book Company", 180, "$10.97"),
(4, 'Hamlet', 'William Shakespeare', 1870, "Simon & Schuster", 342, "$6.99");


-- COMMIT;

-- CREATE USER 'msisreader'@'%' IDENTIFIED BY 'msisreadonly';
-- GRANT SELECT ON * . * TO 'msisreader'@'%';


