const mongoose = require('mongoose')
const requestSchema = new mongoose.Schema({

    personname: {

        type: String,
        required: true,

    },
    location:{

        type: String,
        required: true,

    },
    bloodgroup:{

        type: String,
        required: true,

    },
    bloodunit:{

        type: Number,
        required: true,

    },
    personid:{
        type: String,
        required: true,

    },
    requestStatus:{
        type: String,
    }

})
const requests = mongoose.model("requests",requestSchema)


module.exports = requests
