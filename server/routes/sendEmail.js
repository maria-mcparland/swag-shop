var express = require("express");
var router = express.Router();

router.post("/send", async function (req, res, next) {
  console.info("Email send request received");
  const userDetails = req.body;
  console.log(userDetails);
  res.send({ message: "success" });
});

module.exports = router;
