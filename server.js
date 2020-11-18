const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/subscribe", (req, res) => {
  if (
    req.body.captcha === undefined ||
    req.body.captcha === "" ||
    req.body.captcha === null
  ) {
    return res.json({ success: false, msg: "select captcha" });
  }

  // Secret key
  const secretKey = "6LdpvDEUAAAAAHszsgB_nnal29BIKDsxwAqEbZzU";
  const verifyURL = `https://google.com/recptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

  // Make a request to verifyURL
  request(verifyURL,  (err, response, body) => {
    body = JSON.parse(body);
    //console.log(body);
    if (body.success !== undefined && !body.success) {
      return res.json({ success: false, msg: "Failed captcha verification" });
    }
    return res.json({ success: true, msg: "success" });
  });
});

// const body = await fetch(verifyURL).then(res => res.json());
//if not successfull

app.listen(3000, () => {
  console.log("port started on 3000");
});
