module.exports = {
  request_offer: async function () {
    return new Promise((resolve, reject) => {
      const { exec, spawn } = require("child_process");
      // start webrtc-cli
      webrtc_process = spawn(
        "webrtc-cli --offer --source " +
          1 +
          " --sink " +
          1 +
          " --pulse-buf 20ms --source-frame 10ms",
        {
          shell: true,
        }
      );
      //   console.log("writing in to webrtc - ");
      //   webrtc_process.stdin.write(offer);
      //   webrtc_process.stdin.end();

      webrtc_process.stdout.on("data", (rdata) => {
        let senddata = Buffer.from(rdata).toString();
        resolve(senddata);
      });
    });
  },

  request_answer: async function (offer) {
    console.log("request answer method");
    return new Promise((resolve, reject) => {
      const { exec, spawn } = require("child_process");
      // start webrtc-cli
      webrtc_process = spawn(
        "webrtc-cli --answer --source " +
          1 +
          " --sink " +
          1 +
          " --pulse-buf 20ms --source-frame 10ms",
        {
          shell: true,
        }
      );
      console.log("writing in to webrtc - ");
      console.log("offer is... ", offer);
      webrtc_process.stdin.write(offer);
      webrtc_process.stdin.end();

      webrtc_process.stdout.on("data", (rdata) => {
        console.log("waiting for answer?");
        console.log(rdata.toString());
        // let senddata = Buffer.from(rdata).toString();
        // resolve(senddata);
      });
    });
  },
};
