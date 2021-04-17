require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.DB_PORT;
const socket = require('socket.io');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000",
}));
app.use(cookieParser());

// setup mongodb
// this require statement is like copying and pasting the code from that file right here!
require('./config/mongoose.config');

// setup routes
require('./routes/karaoke.routes')(app);
require('./routes/user.routes')(app);


const server = app.listen(port, () => console.log("Listenting on port: " + port));

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: [ 'GET', 'POST' ],
    allowedHeaders: ['*'],
  }
});

// connection is a manditory event for clients to connect with the server
io.on("connection", (socket) => {
  console.log('Server Side socket id: ' + socket.id);

  // after my connection is established, the server needs to know 
  //    what events to listen for and how to react 

  socket.on("new_song_added", (data) => {
    console.log("new song added");
    console.log(data);
    socket.broadcast.emit("added_song", data);
  });

  // io.emit emits an event to all connected clients
  // socket.broadcast.emit emits an event to all clients other than 
  //     this particular one, referenced by the socket variable
  // socket.emit emits an event directly to this specific client
});
