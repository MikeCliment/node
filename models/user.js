var bcrypt = require("bcryptjs")
var mongoose = require("mongoose")

var salt_factor = 10;

var userschema = mongoose.Schema({
    username:{type:String},
    email:{type:String,unique:true},
    password:{type:String},
    createdat:{type:Date,default:Date.now},
    metaid:{type:String,unique:true}

})

/// Password Hash and encryption (for security)

userschema.pre("save",function(done){
    var user = this;

    if(!user.isModified("password")){
        return done();
    }

    bcrypt.genSalt(salt_factor, function(err,salt){
        if(err){return done(err);}
        bcrypt.hash(user.password,salt,function(err,hashedpassword){
            if(err) {return done(err);}

            user.password = hashedpassword;

            done();

        })
    })
})

userschema.methods.checkpassword = function(guess,done){
    if(this.password != null){
        return bcrypt.compare(guess,this.password)

        
    }
}

var user = mongoose.model("User",userschema)

module.exports = user;