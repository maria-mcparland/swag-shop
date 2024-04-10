var express = require("express");
const { gatherAccessToken } = require("../utils/gatherOAuthToken");
var router = express.Router();

router.get("/", async function (req, res, next) {
  const access_token = await gatherAccessToken();
  console.log("request received");
  res.send({ token: access_token });
});

module.exports = router;
