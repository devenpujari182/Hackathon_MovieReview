create table users(
    user_id integer primary key auto_increment,
    firstName varchar(20),
    lastName varchar(20),
    email varchar(50) unique not null,
    password varchar(100),
    birth date
);

create table reviews(
    review_id integer primary key auto_increment,
    rating integer,
    user_id integer,
    movie_id integer,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (movie_id)REFERENCES movies(movie_id),
    modified TIMESTAMP
);

create table movies(
    movie_id int not null primary key auto_increment,
    title varchar(20),
    release_date DATE
);

create table shares(
    review_id integer,
    user_id integer,
    FOREIGN KEY (review_id) REFERENCES reviews(review_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);