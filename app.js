var express = require("express");
var path = require("path");
var app = express();
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var params = require("./params/params");
const bodyParser = require("body-parser");
var setuppassport = require("./setuppassport");


app.use(express.static('public'));
app.set('view engine', 'ejs');

///Connect to the database
mongoose.connect(params.databaseconnection, { useUnifiedTopology: true, useNewUrlParser: true, serverSelectionTimeoutMS: 50000 });
setuppassport();

app.set("port", process.env.PORT || 3000);



app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: "asqdwojefiqojqfjo",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/web/home"));


app.listen(app.get("port"), function () {
  console.log("server starting on port " + app.get("port"));
});
