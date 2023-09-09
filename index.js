require("dotenv").config();

const gui_port = process.env.GUI_PORT;
const { io } = require("socket.io-client");

const socket = io(process.env.API_SERVER, { path: process.env.SOCKET_PATH });

let device_obj = {
  id: process.env.DEVICE,
  type: "device",
  pairing: process.env.PAIRING_CODE,
  status: "disconnected",
  auth: "A",
};

socket.on("handshake", function (data) {
  let a = checkAuth(data);
  if (a == true) {
    device_obj.status = "connected";
    socket.emit("handshake_response", device_obj);
  }
});

socket.on("gui_update", function (data) {
  console.log(data);
});
socket.on("establish_connection", function (data) {
  if (data.type == "webrtc_request_offer") {
    console.log("RECEIVE - request_offer");
    socket.emit("establish_connection", { type: "webrtc_return_offer" });
    console.log("EMIT - return_offer");
  } else if (data.type == "webrtc_provide_offer") {
    console.log("RECEIVE - provide_offer");
    socket.emit("establish_connection", { type: "webrtc_return_answer" });
    console.log("EMIT - return_answer");
  } else if (data.type == "webrtc_provide_answer") {
    console.log("RECEIVE - provide_answer");
  }
});

function checkAuth(data) {
  if (data.auth == "A") {
    return true;
  } else {
    return false;
  }
}
