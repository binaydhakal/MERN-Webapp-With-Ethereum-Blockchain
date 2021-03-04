const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./databse/db');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth');
const kycRoutes = require('./routes/kyc');
const kycFromrequestRoutes = require('./routes/kycFromrequest');
const kycAddressRoutes = require('./routes/kycAddress');
const app = express();
// const http = require('http').Server(app);
// const io = require("socket.io")(http);

connectDB();

// io.on('connection', (socket) => {
//     console.log('a user connected');
//   });
  
  
//   const connection = mongoose.connection;
//   connection.once("open", () => {
//     console.log("MongoDB database connected");
  
//     console.log("Setting change streams");
//     const kycChangeStream = connection.collection("kycs").watch();
  
//     kycChangeStream.on("change", (change) => {
 
//         const isvalid = change.fullDocument.isvalid

//           io.of("/api/socket").emit("changedValidation", isvalid);
//     });
//   });

// const socket = new WebSocket("ws://localhost:5001");

// socket.onopen(() => {
//   socket.send("Hello!");
// });

// socket.onmessage(data => {
//   console.log(data);
// });


//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/requestkyc', kycFromrequestRoutes);
app.use('/api/kycAddress', kycAddressRoutes);
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Listening on ${port}`));

module.exports = app;