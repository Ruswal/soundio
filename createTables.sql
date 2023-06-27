CREATE TABLE users (
    ID int NOT NULL AUTO_INCREMENT,
    email varchar(150),
    pswd varchar(50),
    username varchar(255),
    pfp_url text,
    created_dt date,
    PRIMARY KEY (ID)
);

CREATE TABLE songs (
    ID int NOT NULL auto_increment,
    song_name text,
    song_art text,
    song_url text,
    genre text,
    artist int,
    release_dt date,
    upload_dt date,
    PRIMARY KEY User(ID)
);

CREATE TABLE user_playlist (
    ID int NOT NULL auto_increment,
    user int,
    name text,
    descr text,
    item_count int,
    created_by int,
    created_on date,
    PRIMARY KEY (ID),
    FOREIGN KEY(user) REFERENCES User(ID) ON DELETE CASCADE
);

CREATE TABLE playlist_items (
    ID int NOT NULL auto_increment,
    playlist int,
    song int,
    PRIMARY KEY (ID),
    FOREIGN KEY(playlist) REFERENCES user_playlist(ID) ON DELETE SET NULL,
    FOREIGN KEY(song) REFERENCES songs(ID) ON DELETE CASCADE
);

CREATE TABLE liked_songs (
    ID int NOT NULL auto_increment,
    user int,
    PRIMARY KEY (ID),
    FOREIGN KEY(user) REFERENCES user(ID) ON DELETE CASCADE
);

CREATE TABLE liked_items (
    ID int NOT NULL auto_increment,
    liked_song int,
    song int,
    date_added date,
    PRIMARY KEY (ID),
    FOREIGN KEY(liked_song) REFERENCES liked_songs(ID) ON DELETE CASCADE,
    FOREIGN KEY(song) REFERENCES songs(ID) ON DELETE CASCADE

);

CREATE TABLE artists (
    ID int NOT NULL auto_increment,
    email text,
    pswd text,
    pfp_url txt,
    name text,
    genre text,
    created_at date,
    PRIMARY KEY (ID)
);

CREATE TABLE albums (
    ID int NOT NULL auto_increment,
    album_art text,
    artist int,
    release_dt date,
    upload_dt date,
    PRIMARY KEY (ID),
    FOREIGN KEY(artist) REFERENCES artists(ID) ON DELETE CASCADE
);

CREATE TABLE album_items (
    ID int NOT NULL auto_increment,
    album int,
    song int,
    PRIMARY KEY (ID),
    FOREIGN KEY(album) REFERENCES albums(ID) ON DELETE CASCADE
);
