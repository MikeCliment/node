var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var user = require("./models/user");

// Setup a authentification strategy

module.exports = function () {
  // Turn a user object into an id
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  // Turn the id into a user object
  passport.deserializeUser(async function (id, done) {
    var User = await user.findById(id);
    done(null, User);
  });

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async function (req, email, password, done) {
        var User = await user.findOne({ email: email });
        try {
          if (!User) {
            return done(null, false, { message: "No user has that email" });
          }

          var isMatch = await User.checkpassword(password);
          try {
            if (isMatch) {
              console.log(User.metaid)
              console.log(req.body.account)
              
              // Compare metaid from the request body with the one in the database

              if (User.metaid === req.body.account) { 
                return done(null, User);
              } else {
                return done(null, false, { message: "Invalid metaid" });
              }
            } else {
              return done(null, false, { message: "Invalid password" });
            }
          } catch (err) {
            return done(err);
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
