const donates = require('../Models/donateScheme')
// const users = require('../Models/userSchema')

//insert donatestatus
exports.donateStatus = async (req, res) => {

    try {
        const { hospitalid, donatestatus } = req.body
        console.log("inside donate controller function");
        const personid = req.payload
        const existingUser = await donates.findOne({ hospitalid, personid })
        console.log(hospitalid, personid, donatestatus);

        if (existingUser) {
            console.log(existingUser);
            const updatestatus = await donates.findOneAndUpdate(
                { personid, hospitalid },
                { $set: { donatestatus } },
                { new: true }
            )
            res.status(200).json(updatestatus)
        }
        else {
            const newDonates = new donates({
                personid, hospitalid, donatestatus
            })
            await newDonates.save()

            res.status(200).json(newDonates)

        }
    }
    catch (err) {
        res.status(401).json(`donatestatus API failed!!!${err}`)
    }

}
//getpersondonatestatus

exports.getpersondonateStatus = async (req, res) => {

    try {

        console.log("inside getpersondonatestatus controller function");
        const  personid  = req.payload

        console.log(personid, "jhghjjh");

        const persondonateStatus = await donates.find({ personid })

        if (persondonateStatus) {
            res.status(200).json(persondonateStatus)
        } else {
            res.status(406).json("getpersondonatestatus not found!!!!!")
        }

    }
    catch (err) {
        res.status(401).json(`getpersondonatestatus API failed!!!${err}`)

    }
}

// Hospital____________________________

// get hospital donate status
exports.getHospitalDonateStatus = async (req, res) => {
    try {
        console.log("inside getHospitalDonateStatus controller function");
        const  hospitalid  = req.payload

        // console.log(hospitalid, "jhghjjh");

        const hospitalDonateStatus = await donates.find({ hospitalid })

        if (hospitalDonateStatus) {
            res.status(200).json(hospitalDonateStatus)
        } else {
            res.status(406).json("getHospitalDonateStatus not found!!!!!")
        }
    }
    catch (err) {
        res.status(401).json(`getHospitalDonateStatus API failed!!!${err}`)
    }
}

// accept or reject donation request
exports.acceptRejectDonationRequest = async (req, res) => {
    console.log("Inside acceptRejectDonationRequest");
    const { personid, donatestatus } = req.body
    const hospitalid = req.payload

    try {
        const existingData = await donates.findOne({ personid, hospitalid })

        console.log(personid,hospitalid,donatestatus,existingData);
        if (existingData) {
            const updateDonation = await donates.findOneAndUpdate(
                { personid, hospitalid },
                { $set: { donatestatus } },
                { new: true }
            )
            console.log(updateDonation,"asd")
            if (updateDonation) {
                res.status(200).json(updateDonation)
            } else {
                res.status(406).json("acceptRejectDonationRequest not found data")
            }
        }

    } catch (err) {
        res.status(401).json(`acceptRejectDonationRequest failed!!! Error: ${err}`)
    }
}


//Total Donations

exports.totalDonations = async (req, res) => {

    try {

        console.log("inside totalDonations controller function");

        const result = await donates.find()

        if (result) {
            res.status(200).json(result)
        } else {
            res.status(406).json("totalDonations not found!!!!!")
        }

    }
    catch (err) {
        res.status(401).json(`totalDonations API failed!!!${err}`)

    }
}