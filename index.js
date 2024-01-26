import "dotenv/config";
import { list } from "pactljson";
const gui_port = process.env.GUI_PORT;
import { io } from "socket.io-client";

const socket = io(process.env.API_SERVER, { path: process.env.SOCKET_PATH });
//const webrtc = require(__dirname + "/webrtc.js");
import webrtc from "./webrtc.js";
console.log(webrtc);
let device_obj = {
  id: process.env.DEVICE,
  type: "device",
  pairing: process.env.PAIRING_CODE,
  status: "disconnected",
  auth: "A",
  sinks: [],
  sources: [],
};

socket.on("handshake", async function (data) {
  let a = checkAuth(data);
  if (a == true) {
    await getSources().then(async (sources) => {
      await getSinks().then((sinks) => {
        device_obj.status = "connected";
        device_obj.sources = sources;
        device_obj.sinks = sinks;
        socket.emit("handshake_response", device_obj);
      });
    });
  }
});

socket.on("gui_update", function (data) {
  console.log(data);
});
socket.on("establish_connection", async function (data) {
  if (data.type == "webrtc_request_offer") {
    console.log("RECEIVE - request_offer");
    console.log(data);
    let offer = await webrtc.request_offer();
    socket.emit("establish_connection", {
      type: "webrtc_return_offer",
      payload: offer,
    });
    console.log("EMIT - return_offer");
  } else if (data.type == "webrtc_provide_offer") {
    console.log("RECEIVE - provide_offer");
    let answer = await webrtc.request_answer(data.payload);
    console.log("answer is..... ", answer.substr(0, 50));
    socket.emit("establish_connection", {
      type: "webrtc_return_answer",
      payload: answer,
    });
    console.log("EMIT - return_answer");
  } else if (data.type == "webrtc_provide_answer") {
    console.log("RECEIVE - provide_answer");
    console.log("**********************************************");
    console.log("**********************************************");
    console.log("**********************************************");
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log(data.payload);
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log("**********************************************");
    console.log("**********************************************");
    console.log("**********************************************");
    let finalConnection = await webrtc.return_answer(data.payload);
  }
});

function checkAuth(data) {
  if (data.auth == "A") {
    return true;
  } else {
    return false;
  }
}

async function getSources() {
  const sourcesObj = await list({ type: "sources" });
  const sourcesJson = JSON.stringify(sourcesObj, null, "  ");
  return sourcesJson;
}

async function getSinks() {
  const sinksObj = await list({ type: "sinks" });
  const sinksJson = JSON.stringify(sinksObj, null, "  ");
  return sinksJson;
}
