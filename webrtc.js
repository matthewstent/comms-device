let webrtc_process = "";
import { execa } from "execa";
import { spawn } from "child_process";

export default {
  request_offer: async function (sink, source) {
    let cmdflags = ["--offer", "--source", source, "--sink", sink];
    return new Promise((resolve, reject) => {
      // start webrtc-cli
      webrtc_process = spawn(
        // "webrtc-cli --offer --source " +
        //   1 +
        //   " --sink " +
        //   0 +
        //   " --pulse-buf 60ms --source-frame 60ms --sink-frame 60ms --jitter-buf 180ms --mode lowdelay",
        `webrtc-cli --offer --source ${source} --sink ${sink}`,
        {
          shell: true,
        }
      );
      //   console.log("writing in to webrtc - ");
      //   webrtc_process.stdin.write(offer);
      //   webrtc_process.stdin.end();

      webrtc_process.stdout.on("data", (rdata) => {
        let senddata = Buffer.from(rdata).toString();
        console.log("***********************************");
        console.log("***********************************");
        console.log(senddata);
        console.log("***********************************");
        console.log("***********************************");
        resolve(senddata);
      });

      // console.log("doing execa");
      // console.log(cmdflags);
      // const { stdout } = await execa("webrtc-cli", cmdflags).stdout.pipe(s);

      // s.stdout.on("data", function (data) {
      //   console.log("data start!", data, "data end!!");
      // });
      // console.log("done execa");
      // console.log("???", stdout);
      // console.log("*^^^^^*");
    });
  },
  request_answer: async function (offer) {
    console.log("request answer method");
    return new Promise((resolve, reject) => {
      // start webrtc-cli
      webrtc_process = spawn(
        "webrtc-cli --answer --source " +
          1 +
          " --sink " +
          0 +
          " --pulse-buf 60ms --source-frame 60ms --sink-frame 60ms --jitter-buf 180ms --mode lowdelay",
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

        let senddata = Buffer.from(rdata).toString();
        console.log("**********************************************");
        console.log("**********************************************");
        console.log("**********************************************");
        console.log(" ");
        console.log(" ");
        console.log(" ");
        console.log(senddata);
        console.log(" ");
        console.log(" ");
        console.log(" ");
        console.log("**********************************************");
        console.log("**********************************************");
        console.log("**********************************************");

        resolve(senddata);
      });
    });
  },

  return_answer: async function (answer) {
    console.log("return answer method");
    console.log("^^^^^^^^^^^^^^^");
    console.log("^^^^^^^^^^^^^^^");
    console.log("^^^^^^^^^^^^^^^");
    console.log("writing in... ", answer.substr(0, 50));
    console.log("^^^^^^^^^^^^^^^");
    console.log("^^^^^^^^^^^^^^^");
    console.log("^^^^^^^^^^^^^^^");
    return new Promise((resolve, reject) => {
      // webrtc_process = spawn(
      //   "webrtc-cli --answer --source " +
      //     1 +
      //     " --sink " +
      //     1 +
      //     " --pulse-buf 20ms --source-frame 10ms",
      //   {
      //     shell: true,
      //   }
      // );

      console.log("writing in to webrtc - ");
      // console.log("offer is... ", offer);
      webrtc_process.stdin.write(answer);
      webrtc_process.stdin.end();
      webrtc_process.stdout.on("data", (rdata) => {
        //   console.log("waiting for answer?");
        let senddata = Buffer.from(rdata).toString();
        console.log(senddata);
        //   console.log("**********************************************");
        //   console.log("**********************************************");
        //   console.log("**********************************************");
        //   console.log(" ");
        //   console.log(" ");
        //   console.log(" ");
        //   console.log(senddata);
        //   console.log(" ");
        //   console.log(" ");
        //   console.log(" ");
        //   console.log("**********************************************");
        //   console.log("**********************************************");
        //   console.log("**********************************************");
        //   resolve(senddata);
      });
    });
  },
};
