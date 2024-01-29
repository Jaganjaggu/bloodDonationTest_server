const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({

    username: {

        type: String,
        required: true,
        min: [3, 'must be atleast 3 , got{value}']

    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email') 
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    bloodgroup: {
        type: String,
    },
    location: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true
    }
 
})
const users = mongoose.model("users",userSchema)


module.exports = users