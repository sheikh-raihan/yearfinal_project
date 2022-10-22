const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var corsOptions = {
    origin: 'http://localhost:5500',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.listen(3000,()=> console.log("listening at port 3000."));


//sign in
app.post('/signin',(request, result) => {
    let sqlQuery = "SELECT * FROM userid WHERE email=\"" + request.body.em+ "\"";
    let query = con.query(sqlQuery, (err, results) => {
      if(err) throw err;
      console.log(results);
      result.json(results);
    });
    //console.log(query);
  });


//sign up
app.post('/signup',(request, result) => {
    let data = {email: request.body.em, u_name: request.body.nam, phn: request.body.phn};
    let data2 = {email:request.body.em, pass: request.body.pass}
    let sqlQuery = "INSERT INTO userinfo SET ?";
    let sqlQuery2 = "INSERT INTO userid SET ?"
    let query = con.query(sqlQuery, data,(err, results) => {
      if(err) throw err;
      //result.send(apiResponse(results));
    });
    let query2 = con.query(sqlQuery2, data2,(err, results) => {
        if(err) throw err;
        //result.send(apiResponse(results));
      });
  });


app.post('/user',(request, result) => {
    let sqlQuery = "SELECT * FROM userinfo WHERE email=\"" + request.body.em+ "\"";
    let query = con.query(sqlQuery, (err, results) => {
      if(err) throw err;
      console.log(results);
      result.json(results);
      //result.send(apiResponse(results));
    });
    //console.log(query);
  });


  app.post('/addchannel',(request, result) => {
    let data = {email: request.body.em, channel_id: request.body.chnl};
    let sqlQuery = "INSERT INTO yt_channel SET ?";
    
    let query = con.query(sqlQuery, data,(err, results) => {
      if(err) throw err;
    });
  });

  app.post('/remchannel',(request, result) => {
    //let data = {email: request.body.em, channelid: request.body.chnl};
    let sqlQuery = "delete from yt_channel where channel_id=\""+request.body.chnl+"\"";
    console.log("assfg");
    let query = con.query(sqlQuery, (err, results) => {
      if(err) throw err;
    });
  });

  app.post('/getchannellist',(request, result) => {
    let sqlQuery = "SELECT channel_id FROM yt_channel WHERE email=\"" + request.body.em+ "\"";
    let query = con.query(sqlQuery, (err, results) => {
      if(err) throw err;
      // console.log(results);
      // console.log(query);
      result.json(results);
    });
  });



var con = mysql.createConnection({
    host: "localhost",
    user: "project",
    password: "1234Abcd.",
    database: "pyt",
    insecureAuth : true
  });
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


module.exports = con