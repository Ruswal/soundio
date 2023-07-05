require("dotenv").config();
const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3001;

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
  user: process.env.USRNAE,
  password: process.env.PSWD,
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
  
  db.query(query, values, (err, result) => {
    if (err) throw err;

    if(result.length === 1){
      res.json({success: true, message: "Login successful"});
    } else {
      res.json({success: false, message: "Login unsuccessful"});
    }

  })
})

// register endpoint
app.post('/register', (req,res) => {
  const values = [req.body.email, req.body.pass, req.body.name, '', new Date()];

  const query = 'INSERT INTO users(email, pswd, username, pfp, created_dt) values (?, ?, ?, ?, ?)';

  db.query(query, values, (err, result) => {
    if (err) throw err;

    if(result.affectedRows === 1){
      res.json({success: true, message: "User created!"});
    } else {
      res.json({success: false, message: "Something went wrong."});
    }
  });
})

app.listen(port, () => {
  console.log(`server is listening to ${port}`);
})
