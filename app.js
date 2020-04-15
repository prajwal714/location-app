const express = require("express");
const http = require("http");
const socketIo = require("socket.io");


const port = process.env.PORT || 4001;
//const index = require("./routes/index");
const app = express();
//app.use(index);

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

let interval;

const getApiAndEmit = async socket => {
    try {
   
    const res=Math.random()*(100);
      socket.broadcast.emit("FromAPI", res); // Emitting a new message. It will be consumed by the client
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
  };

io.on("connection", socket => {
  console.log("New client connected", socket.id);
  // if (interval) {
  //   clearInterval(interval);
  // }
  // interval = setInterval(() => getApiAndEmit(socket), 1000);
 setInterval(() => socket.emit('time', new Date().toTimeString()), 1000);

  socket.on('position', (position)=>{
      console.log("Lattitude", position );
      
  })
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});



server.listen(port, () => console.log(`Listening on port ${port}`));
