// require needed tech - mongoose to interact with database
var mongoose = require("mongoose");
// use bcrypt for encryption of password
var bcrypt   = require('bcrypt-nodejs');

// create userSchema object and give it object that will denote our user
var userSchema = mongoose.Schema({
  //nested inside local key as can then use different keys in different environments
  local: {
    username: { type: String },
    fullname: { type: String },
    image: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  },
  // associate contacts model with user model
  contacts: [{ type: mongoose.Schema.ObjectId, ref: 'Contact' }]
});

// using bcrypt to authenticate
userSchema.statics.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

// export module to make available in scope
module.exports = mongoose.model("User", userSchema);