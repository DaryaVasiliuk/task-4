// var express = require('express')
// var app = express()
// var router = express.Router([])

// router.get('/registration', function (req, res) {
//   res.send('hello world')
// })
// app.listen(3000)
const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const router = express.Router()


const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'db'
})


app.use(cors());
app.use(express.json());


router.param((param, option) => {
  return (req, res, next, val) => {
    if (val === option) {
      next()
    } else {
      res.sendStatus(403)
    }
  }
})

// using the customized router.param()
router.param('id', 1337)

// route to trigger the capture
router.get('/user/:id', (req, res) => {
  res.send('OK')
})


// route to trigger the capture
router.get('/users', (req, res) => {
  res.send('list')
})

// route to trigger the capture
router.post('/registration', (req, res) => {
  
  connection.connect()

  let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  let insert = "INSERT INTO users (`name`, `email`, `password`, `status`, `registration_date`) VALUES ('"+req.body.name
  +"','"+req.body.email+"','"+req.body.password+"','confirmed','"+date+"')";
  
  connection.query(insert, function (error, results, fields) {
    connection.end()
    if (error) res.json({err: error});
    res.json({results: results, fields: fields});
  })

})

router.post('/login', (req, res) => {
  connection.connect();

  let lastData = new Date().toLocaleDateString('en-US')

  let loginBd = `SELECT * FROM users WHERE email = ${req.body.email} AND password = ${req.body.password}`;

  let lastLogin = `UPDATE users SET last_login = ${lastData}`;

  connection.query(lastLogin, function (error, results, fields) {
    connection.end()
    if (error) res.json({err: error});
    res.json({results: results, fields: fields});
  })
});

app.use(router)




// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })



// app.post('/registration', (req, res) => {
//   //connection to db
//   //save to db
//   //get user db 
//   //let request = JSON.parse(req);  
//   res.set('Content-Type', 'application/json')
//   res.send({res: req})

 
//   //
  
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})