const express = require("express");
const { fork } = require("child_process");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/fib", (req, res) => {
  const { number, requestNumber } = req.query;
  if (!number || !requestNumber || number < 0) {
    return res.status(400).send("Please provide number and requestNumber");
  }

  const fiboRes = fork(path.join(__dirname, "fiboWorker.js"));
  fiboRes.send({ number: parseInt(number, 10) });
  fiboRes.on("message", (answer) => {
    res.send({
      status: "success",
      message: answer,
      requestNumber: requestNumber,
    });
    fiboRes.kill();
  });
});

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
