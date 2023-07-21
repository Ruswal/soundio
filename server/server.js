require("dotenv").config();
const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs')
const {Storage} = require('@google-cloud/storage');
const formidable = require('formidable');
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

  const createPlaylistValues = req.body;

  const createPlaylistQuery = 'INSERT INTO user_playlist (user, name, created_by, created_on) VALUES (?, ?, ?, ?)';

  db.query(createPlaylistQuery, createPlaylistValues, (err, result) => {
    if(err) throw err;

    if(result.length === 1) res.json({status: true, message: 'playlist created'}, result);
    else res.json({status: false, message: 'failed to create the playlist'});

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
  console.log('Buckets:');

  for (const bucket of buckets) {
    console.log(`- ${bucket.name}`);
  }

  console.log('Listed all storage buckets.');
}

const multerStorage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, __dirname + '/uploads');
  },
  filename: function(req, file, callback){
    callback(null, file.originalname);
  }
})

// const uploads = multer({storage: multerStorage});
const uploads = multer({dest: __dirname + '/uploads'});

// authenticateImplicitWithAdc();
app.post('/upload', uploads.array('files'), (req, res) => {

  authenticateImplicitWithAdc();

  const storage = new Storage();
  const bucketName = 'soundio-songs';
  const URL = '/server/uploads/' + req.files[0].filename;

  console.log(req.files[0].filename);
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


  // console.log(__dirname + '/uploads/' + req.files[1].filename)


  // const uploadFile = async() => {
  //   const options = {
  //     destination: reqBody.songName + '.mp3',
  //   }
  //   await storage.bucket(bucketName).upload(reqBody.localFileDestination, options);

  //   console.log(`${reqBody.localFileDestination} uploaded to ${bucketName}`)
  // }
  // fs.close();

  // uploadFile().catch(console.error);
})

app.listen(port, () => {
  console.log(`server is listening to ${port}`);
})
