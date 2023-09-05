require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const gui_port = process.env.GUI_PORT;

app.get("/bootstrap.min.css", function (req, res) {
  res.sendFile(
    __dirname + "/node_modules/bootstrap/dist/css/bootstrap.min.css"
  );
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  let init_msg = {
    device: process.env.DEVICE,
    status: "Disconnected",
    pairing: "3FGXO3",
  };
  io.emit("init", init_msg);
});
setInterval(() => {
  io.emit("stat_msg", { log: "hello" });
}, 2000);

server.listen(gui_port, () => {
  console.log("Device", process.env.DEVICE, "listening on *:", gui_port);
});
