require("dotenv").config();
const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const {Storage} = require('@google-cloud/storage');
const multerGoogleStorage = require('multer-google-storage');
const port = process.env.PORT||3001;
const multer = require ('multer');

const app = express();

app.use(bodyParser.json());

app.use(cors({
  // origin: 'http://localhost:5173',
  origin: 'https://canvas-advice-391121.wm.r.appspot.com',
  credentials: true,
}));

// database connection setup
const db = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DB,
  user: process.env.USRNAME,
  password: process.env.PSWD,
  multipleStatements: true,

});

// connection to the database
db.connect((err)=>{
  if(err) throw err;
  console.log("DB connection successful");
})

// Login endpoint
app.post('/login', (req, res) => {

  const values = [req.body.email, req.body.pass];

  const query = 'select * from users where email = ? and pswd = ?';

  db.query(query, [req.body.email, req.body.pass], (err, result) => {
    if (err) throw err;

    if(result.length === 1){
      res.json({status: true, message: "Login successful", result});
    } else {
      res.json({status: false, message: "User not found."});
    }

  })

});


// register endpoint
app.post('/register', (req,res) => {

  const createUserValues = [req.body.email, req.body.password, req.body.username, '', new Date(), req.body.artist];

  const createUserQuery = 'INSERT INTO users(email, pswd, username, pfp, created_dt, isArtist) values (?, ?, ?, ?, ?, ?)';

  const searchExistingEmail = 'SELECT ID FROM users where email = ?'

  db.query(searchExistingEmail, [req.body.email], (err, result) => {
    if(err) throw err;

    if(result.length === 0) {
      // create artist query execution
      db.query(createUserQuery, createUserValues, (err, result) => {
        if(err) throw err;

        if(result.affectedRows === 1){
          res.json({status: true, message: "user created!"});
        } else {
          res.json({status: false, message: "Something went wrong."});
        }
      });
    } else {
      res.json({status:false, message: "E-mail already in-use. Try different one"});
    }
  });


});

// create playlist endpoint
app.post('/create-playlist', (req, res) => {

  const createPlaylistQuery = 'INSERT INTO user_playlist (user, name, created_by, created_on) VALUES (?, ?, ?, ?)';

  const lastInsertedID = 'SELECT LAST_INSERT_ID() as ID';

  db.query(createPlaylistQuery, [
    req.body.user,
    req.body.name,
    req.body.created_by,
    new Date(),
  ], (err, result) => {
    if(err) throw err;
    db.query(lastInsertedID, (err, result) => {
      if(err) throw err;
      res.status(200).send(result);
    })
  });
});

// update playlist name endpoint
app.post('/update-playlist-name', (req, res) => {

  const updatePlaylistName = 'UPDATE user_playlist SET name = ? WHERE ID = ? AND user = ?';

  db.query(
    updatePlaylistName,[
      req.body.name,
      req.body.id,
      req.body.user,
    ], (err, result) => {
      if(err) throw err;
      if(result.length === 1) res.status(200).send(result);
      else res.status(201).send('no playlist found');
    });
});



// upload song endpoint

/**
 * TODO(developer):
 *  1. Uncomment and replace these variables before running the sample.
 *  2. Set up ADC as described in https://cloud.google.com/docs/authentication/external/set-up-adc
 *  3. Make sure you have the necessary permission to list storage buckets "storage.buckets.list"
 *    (https://cloud.google.com/storage/docs/access-control/iam-permissions#bucket_permissions)
 */
const projectId = 'canvas-advice-391121';

async function authenticateImplicitWithAdc() {
  // This snippet demonstrates how to list buckets.
  // NOTE: Replace the client created below with the client required for your application.
  // Note that the credentials are not specified when constructing the client.
  // The client library finds your credentials using ADC.
  const storage = new Storage({
    projectId,
  });
  const [buckets] = await storage.getBuckets();

}

var uploadHandler = multer({
  storage: multerGoogleStorage.storageEngine({
    autoRetry: true,
    bucket: 'canvas-advice-391121.appspot.com',
    projectId:'canvas-advice-391121',
    keyFilename: './canvas-advice-391121-cbcf758fcae9.json',
    filename:function(req, file, callback){
      callback(null, Date.now() + '.mp3');
    }
  })
})

// upload endpoint
app.post('/upload', uploadHandler.any(), (req, res) => {
  const URL = req.files[0].path;

  authenticateImplicitWithAdc();

  const uploadSongValues = [
    req.body.songName,
    URL,
    req.body.songGenre,
    new Date(),
  ];

  const uploadSongQuery = 'INSERT INTO songs(name, url, genre, upload_dt) VALUES (?, ?, ?, ?)'

  db.query(uploadSongQuery, uploadSongValues, (err, result) => {
    if(err) throw err;

    if (result.length === 1) { res.json({status: true, message: 'Song uploaded successfully'}) }
    else { res.json({status: false, message: 'Failed to upload song.'}) }
  })
})

// search endpoint
app.post('/search', (req, res) => {

  const searchValue = req.body.value + '%';

  const searchQuery = 'SELECT name FROM songs WHERE name LIKE ?'

  db.query(searchQuery, searchValue, (err, result) => {
    if(err) throw (err)
    res.send(res);
  })
})

// get-songs endpoint
app.post('/get-songs', (req, res) => {
  const getSongsQuery = 'SELECT * FROM songs';

  db.query(getSongsQuery, (err, result) => {
    if(err) throw err;
    return res.send(result);
  })
})

// get-playlist endpoint
app.post('/get-playlists', (req, res) => {
  const user_id = req.body.user_id;
  const getPlaylistsQuery = 'SELECT * from user_playlist where user = ?';

  db.query(getPlaylistsQuery, user_id, (err, result) => {
    if(err) throw err;
    res.send(result);
  })
})

// get-playlist-item endpoint
app.post('/get-playlist-items', (req, res) => {
  const id = req.body.playlist;
  const getPlaylistItems = 'SELECT S.*, P.name AS P_name FROM songs S LEFT JOIN playlist_items PI ON S.ID = PI.song LEFT JOIN user_playlist P ON P.ID = PI.playlist WHERE PI.playlist = ?';

  db.query(getPlaylistItems, id, (err, result) => {
    if(err) throw err;
    res.status(200).send(result);
  })
})

// add-to-playlist endpoint
app.post('/add-to-playlist', (req, res) => {
  const selectedPlaylist = req.body.selectedPlaylist;
  const songID = req.body.songID;
  const query = 'INSERT INTO playlist_items (playlist, song) VALUES (?, ?)';
  for (let index = 0; index < selectedPlaylist.length; index++) {
    db.query(query, [selectedPlaylist[index], songID], (err, result) => {
      if(err) throw (err)
      res.status(200).send('Saved to playlist');
    })
  }
})

app.listen(port, () => {
  console.log(`server is listening to ${port}`);
})
