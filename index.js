const express = require('express')
const app = express()
const path = require('path');
const { connect } = require('./server/dbconnection');


app.use(express.json()); 

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

app.use(express.static(__dirname + "/public"));

app.use("/", require("./server/routes/index"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log(`Server started on PORT ${PORT}!!!`)
connect();
});






