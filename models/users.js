var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    name: String,
    role: String
});

var Users = mongoose.model('Users', userSchema);

module.exports = Users;
