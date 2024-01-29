const mongoose = require('mongoose')
const donateSchema = new mongoose.Schema({

    personid: {

        type: String,
        required: true,

    },
    hospitalid:{

        type: String,
        required: true,

    },
    donatestatus:{

        type: String,
        required: true,

    }
})
const donates = mongoose.model("donates",donateSchema)


module.exports = donates
