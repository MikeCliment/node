var express = require("express")
var router = express.Router()
var passport = require("passport");
var user = require("../../models/user");


router.use(function(req,res, next){
    res.locals.currentUser = req.user;

    next();
});

// Route views

router.get("/", (req,res)=>{

res.render("home")
})

router.get("/home", (req,res)=>{

    res.render("home")
    })

router.get("/about", (req,res)=>{

    res.render("about")
    })

router.get("/crypto", (req,res)=>{
    res.render("crypto")
})

router.get("/login", (req,res)=>{

    res.render("login")
    })

router.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) {

      return next(err);
    }

    res.redirect("/home");
  });
});

// Handle login redirections


router.post("/login", passport.authenticate("login",{
    successRedirect: "/",
    failureRedirect: "/login"
}))



router.get("/signup", (req,res)=>{

    res.render("signup")
    })

//Handle signup data 

router.post("/signup", async (req,res,next)=>{
    try {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var metaid = req.body.account;

    const User = await user.findOne({email: email})
        if(User){
            return res.redirect("/signup");
        } 
        
        console.log(metaid)

        var newuser =  new user({
            username:username,
            password:password,
            email:email,
            metaid:metaid
        });

        await newuser.save();
        return res.redirect("/");
    
    }
    catch(err){
        next(err);
    }


}
    , passport.authenticate("login", {
    successRedirect:"/",
    failureRedirect:"/signup"
    }))




module.exports = router;