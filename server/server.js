require("dotenv").config();
const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const {Storage} = require('@google-cloud/storage');
const port = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
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
  console.log(values);

  const query = 'select * from users where email = ? and pswd = ?';

  db.query(query, [req.body.email, req.body.pass], (err, result) => {
    if (err) throw err;
    console.log(result);

    if(result.length === 1){
      res.json({status: true, message: "Login successful", result});
    } else {
      res.json({status: false, message: "User not found."});
    }

  })
});

// register endpoint
app.post('/register', (req,res) => {

  const createUserValues = [req.body.email, req.body.password, req.body.username, '', new Date(), req.body.artist, req.body.genre];

  const createUserQuery = 'INSERT INTO users(email, pswd, username, pfp, created_dt, isArtist, makeGenre) values (?, ?, ?, ?, ?, ?, ?)';

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
      res.json({status:false, message: "E-mail already in-use."});
    }
  });

});

// create playlist endpoint
app.post('/create-playlist', (req, res) => {

  const createPlaylistValues = [
    req.body.uid,
    req.body.playlist_name,
    req.body.create_by,
    new Date(),
  ];

  const createPlaylistQuery = 'INSERT INTO user_playlist (user, name, created_by, created_on) VALUES (?, ?, ?, ?)';

  db.query(createPlaylistQuery, createPlaylistValues, (err, result) => {
    if(err) throw err;

    if(result.length === 1) res.json({status: true, message: 'playlist created'}, result);
    else res.json({status: false, message: 'failed to create the playlist'});

  });

});

// upload song endpoint
app.post('/upload', (req, res) => {
  const reqBody = req.body;
  const storage = new Storage();
  const bucketName = 'soundio-songs';

  const extractFilename = (path) => {
    if (path.substr(0, 12) == "C:\\fakepath\\")
      return path.substr(12); // modern browser
    var x;
    x = path.lastIndexOf('/');
    if (x >= 0) // Unix-based path
      return path.substr(x+1);
    x = path.lastIndexOf('\\');
    return path; // just the filename
  }

  const uploadFile = async() => {
    const options = {
      destination: reqBody.songName,
    }
    await storage.bucket(bucketName).upload(reqBody.localFileDestination, options);

    console.log(`${reqBody.localFileDestination} uploaded to ${bucketName}`)
  }
  console.log(reqBody);
  uploadFile().catch(console.error);
})

app.listen(port, () => {
  console.log(`server is listening to ${port}`);
})
