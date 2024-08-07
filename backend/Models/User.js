const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema =new Schema({
    firstName : {
        type : String,
        require : true
    },
    lastName : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique:true
    },
    password : {
        type : String,
        require : true
    },
    state : {
        type : String,
        require : true
    },
    city : {
        type : String,
        require : true
    },
    pincode : {
        type : String,
        require : true
    },
    dateOfBirth : {
        type : String,
        require : true
    }

})

//'users' is the name of the collection in MongoDB
const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;