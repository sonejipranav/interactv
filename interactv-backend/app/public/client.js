

var socket = io.connect("https://mellow-entertaining-celery.glitch.me/")

// // // var socket = io();


socket.on("welcome", (data)=>{
  
  console.log("incomming ", data)
});

socket.on('error', function (err) {
    console.log(err);
});


socket.on("popo", (data)=>{
  console.log(data);
});