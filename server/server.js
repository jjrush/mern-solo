require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.DB_PORT;
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
