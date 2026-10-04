const express = require("express");
const cors = require("cors");
const { connectDb } = require("./utils/db");
const app = express();
require("dotenv").config();
const router = express.Router();
const path = require("path");
app.use(cors());

const PORT = process.env.PORT || 7000;
const http = require("http").Server(app);

app.use(express.json());

const socketIO = require('socket.io')(http, {
  cors: {
    origin: `<http://${process.env.IP_ADDRESS}:${PORT}>`
  }
})

socketIO.on('connection', async (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("findChannel", async (id) => {
    const result = await findChannel(id)
    socket.emit("foundChannel", result);
  });

  socket.on("createChannel", async (data) => {
    const result = await createChannel(data)
    socket.emit("foundId", result);
    const list = await findChannel(data.userId)
    socket.emit("foundChannel", list);
    // socket.emit("f oundChannel", result);
  });

  socket.on("sendMessage", async (data) => {
    const result = await sendMessage(data)
    console.log('result', result)
    socket.emit("foundMessage", result)
  })

  socket.on("allMessage", async (id) => {
    const result = await getConversations(id)
    console.log('result', result)
    socket.emit("foundMessage", result)
  })
  socket.on('disconnect', () => {
    socket.disconnect()
    console.log('🔥: A user disconnected');
  });
});

const userRoute = require("./routes/user-route");

const vetRoute = require("./routes/vet-route");

const petRoute = require("./routes/pet-route");

const medRoute = require("./routes/medicine-route");

const favRoute = require("./routes/favourite-route");

const chatRoute = require("./routes/chat-route");
const { findChannel, getConversations, sendMessage, createChannel } = require("./controllers/chat-controller");


app.use("/user", userRoute);
app.use("/vet", vetRoute);
app.use("/pet", petRoute);
app.use("/med", medRoute);
app.use("/fav", favRoute);
app.use("/chat", chatRoute);
app.use('/images', express.static(path.join(__dirname, 'images')));

// app.use((err, req, res, next) => {
//   const errorStatus = err.status || 500;
//   const errorMessage = err.message || "Something went wrong";
//   return res.status(errorStatus).json({
//     success: false,
//     status: errorStatus,
//     message: errorMessage,
//     stack: err.stack,
//   });
// });
// app.use(router)


connectDb()
  .then(() => {
    http.listen(PORT, process.env.IP_ADDRESS, (res) => {
      console.log("server started", res);
    });
  })
  .catch((err) => {
    console.log("Error with database", err);
  });
