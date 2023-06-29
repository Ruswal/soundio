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
  user: process.env.USERNAME,
  password: process.env.PSWD,
});

// connection to the database
db.connect((err)=>{
  if(err) throw err;
  console.log("DB connection successful");
})

// Login endpoint
app.post('/login', (req, res) => {
  
  const email = req.body.email;
  const password = req.body.pass;

  const query = 'select * from users where email = ? and pswd = ?';
  
  db.query(query, [email, password], (err, result) => {
    if (err) throw err;

    if(result.length === 1){
      res.json({success: true, message: "Login successful"});
    } else {
      res.json({success: false, message: "Login unsuccessful"});
    }

  })
})

app.listen(port, () => {
  console.log(`server is listening to ${port}`);
})
