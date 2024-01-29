const requests = require('../Models/requestSchema');
const { donateStatus } = require('./donateController');

//request blood

exports.requestblood = async (req, res) => {

    console.log("inside request blood controller function");
    const personid = req.payload
    const { personname, location, bloodgroup, bloodunit  ,requestStatus} = req.body
    // res.status(200).json("blood request is recieved!!!")
    console.log(personname, location, bloodgroup, bloodunit);
    try {
        const newRequests = new requests({
            personname, location, bloodgroup, bloodunit, personid ,requestStatus
        })

        await newRequests.save()
        res.status(200).json(newRequests)

    } catch (err) {
        res.status(401).json(`Requests API Failed!!!${err}`)

    }
}
//actions

exports.action = async (req,res) => {
    console.log("inside action controller function");
    const personid = req.payload

    try {
        const result = await requests.find({personid})
        // if(result.status===200){
            res.status(200).json(result)

        // }
    } catch (err) {
        res.status(406).json(`actions API Failed!!!${err}`)

    }
}

// get requests status
exports.getRequets = async (req, res) => {
    try {

        console.log("inside getRequets controller function");

        const requeststatus = await requests.find()

        if (requeststatus) {
            res.status(200).json(requeststatus)
        } else {
            res.status(406).json("getRequets not found!!!!!")
        }
    }
    catch (err) {
        res.status(401).json(`getRequets API failed!!!${err}`)
    }
}


// accept or reject donation request
exports.acceptRejectRequests = async (req, res) => {
    console.log("Inside acceptRejectRequests function");
    const { personname,personid, requestStatus } = req.body
    const hospitalid = req.payload
        console.log(personname,hospitalid,personid, requestStatus)


    try {
        const existingData = await requests.findOne({ personname,personid })
        console.log(existingData);
        if (existingData) {
            const updateDonation = await requests.findOneAndUpdate(
                { personid, personname },
                { $set: { requestStatus } },
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


// delete blood request
exports.deletebloodrequest = async (req,res) => {
    console.log("Inside deletebloodrequest");
    const {id} = req.params
    console.log(id);
    try{
        const removeProject = await requests.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    }catch(err){
        res.status(406).json("viewBloodRequest not found data")
    }
}



//Total requests

exports.totalRequests = async (req, res) => {

    try {

        console.log("inside totalRequests controller function");

        const result = await requests.find()

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