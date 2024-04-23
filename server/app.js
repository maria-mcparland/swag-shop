var createError = require("http-errors");
var express = require("express");
var indexRouter = require("./routes/index");
var acceptPaymentRouter = require("./routes/acceptPayments");
var sendEmailRouter = require("./routes/sendEmail");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", indexRouter);
app.use("/api/accept/", acceptPaymentRouter);
app.use("/api/email/", sendEmailRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(8081, () => {
  console.log(`
################################################
🛡️  Server listening on port: 8081 🛡️
################################################
`);
});

module.exports = app;
