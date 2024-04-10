var express = require("express");
const { gatherAccessToken } = require("../utils/gatherOAuthToken");
var router = express.Router();


router.get("/createAPayment", async function (req, res, next) {
  console.info("Online payment create payment received");
  const access_token = await gatherAccessToken();

  const url = "https://api-mock.payments.jpmorgan.com/api/v2/payments";
  const options = {
    method: "POST",
    headers: {
      "request-id": "10cc0270-7bed-11e9-a188-1763956dd7f6",
      "merchant-id": "998482157630",
      minorVersion: "",
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: '{"captureMethod":"NOW","amount":1234,"currency":"USD","merchant":{"merchantSoftware":{"companyName":"Payment Company","productName":"Application Name","version":"1.235"},"merchantCategoryCode":"4899"},"paymentMethodType":{"card":{"accountNumber":"4012000033330026","expiry":{"month":5,"year":2027},"isBillPayment":true}},"initiatorType":"CARDHOLDER","accountOnFile":"NOT_STORED","isAmountFinal":true}',
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    res.send({ response: data });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
