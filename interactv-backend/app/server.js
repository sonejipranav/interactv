const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
var socket = require('socket.io')
const app = express();
const http = require("http").createServer(app);

const AuthRoute = require('./routes/auth');

mongoose.connect('mongodb+srv://admin:admin@interactv.ahz8v.mongodb.net/interactv?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    console.log('Database Conection Established!');
});

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const PORT = process.env.PORT || 3000;

const listner = app.listen(PORT, () => { //listner = server
    console.log(`Server is running: ${PORT}`);
});

//static files
app.use(express.static('public'));

app.use('/api', AuthRoute);

//socket setup

var io = socket(listner);

var channel1 = []

io.on("connection", socket => {
  channel1.push({type:'user',socket})
  console.log("New user");
  
  socket.on("pepe", (data)=>{
    // var question = data.question
    // var id = data.id
      channel1.forEach(e=> {
        if(e.type == 'user'){
          e.socket.emit("popo", data)
        }
       // console.log("incomeing ", data)
      })        
      console.log(data)
    })

});

  


// // server.js
// // where your node app starts

// // we've started you off with Express (https://expressjs.com/)
// // but feel free to use whatever libraries or frameworks you'd like through `package.json`.
// const express = require("express");
// const app = express();
// const body = require("body-parser");

// const http = require("http").createServer(app);

// // our default array of dreams
// const dreams = [
//   "Find and count some sheep",
//   "Climb a really tall mountain",
//   "Wash the dishes"
// ];

// // make all the files in 'public' available
// // https://expressjs.com/en/starter/static-files.html
// app.use(express.static("public"));
// app.use(body.json());

// // https://expressjs.com/en/starter/basic-routing.html
// app.get("/", (request, response) => {
//   response.sendFile(__dirname + "/views/index.html");
// });




// // listen for requests :)
// const listener = app.listen(process.env.PORT, () => {
//   console.log("Your app is listening on port " + listener.address().port);
// });

// const io = require("socket.io").listen(listener);
// var arr = { 1: "What are you", 2: "Why are you", 3: "Hell No" };

// var channel1 = []

// io.on("connection", socket => {
//   channel1.push({type:'user',socket})
//   console.log("New user");
  
//   socket.on("pepe", (data)=>{
//       channel1.forEach(e=> {
//         if(e.type == 'user'){
//           e.socket.emit("popo", data)
//           // console.log("incomeing ", data)
//         }
        
       
//       })        
//       console.log(data)
//     })

// });



// app.post("/send", (request, response) => {
//   console.log("Req");
//   var data = request.body;

//   response.send(data);
//   console.log(data)
// });
// io.on("disconnect", socket => {
//   console.log("user disconnected");
// });
