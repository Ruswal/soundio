CREATE TABLE users (
    userID int NOT NULL AUTO_INCREMENT,
    email varchar(255),
    pswd varchar(255),
    name varchar(255),
    pfp_url text,
    created_dt date
);

CREATE TABLE user_playlist (
    pID int NOT NULL auto_increment,
    user int,
    name text,
    descrip text,
    item_count int,
    created_by int,
    created_on date
);

CREATE TABLE liked_songs (
    lID int NOT NULL auto_increment,
    user int
);

CREATE TABLE playlist_items (
    piID int NOT NULL auto_increment,
    playlist int,
    song int
);

CREATE TABLE liked_items (
    liID int NOT NULL auto_increment,
    liked_song int,
    song int,
    date_added date
);

CREATE TABLE artists (
    artistID int NOT NULL auto_increment,
    email text,
    pswd text,
    pfp_url txt,
    name text,
    genre text,
    created_at date
);

CREATE TABLE albums (
    aID int NOT NULL auto_increment,
    album_art text,
    artist int,
    release_dt date,
    upload_dt date
);

CREATE TABLE album_items (
    aiID int NOT NULL auto_increment,
    album int,
    song int
);

CREATE TABLE songs (
    songID int NOT NULL auto_increment,
    song_name text,
    song_art text,
    song_url text,
    genre text,
    artist int,
    release_dt date,
    upload_dt date,
);