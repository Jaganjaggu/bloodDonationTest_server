const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

//register

exports.register = async (req, res) => {

  console.log(" Inside register controller function");
  const { username, email, password, location, bloodgroup, usertype } = req.body
  // res.status(200).json("Register Request Is Received!!!!")
  try {
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      res.status(406).json("Account already exist...please login!!!")
    } else {
      const newUser = new users({
        username, email, password, bloodgroup, usertype, location

      })
      await newUser.save()
      res.status(200).json(newUser)
    }
  }
  catch (err) {
    res.status(401).json(`Register API Failed!!!${err}`)
  }
}
//login

exports.login = async (req, res) => {
  console.log(" Inside login controller function");
  const { email, password } = req.body
  try {
    const existingUser = await users.findOne({ email, password })

    console.log(existingUser);
    if (existingUser) {
      const token = jwt.sign({ userId: existingUser._id }, "secretkey123")

      res.status(200).json({

        existingUser, token
      })
    } else {
      res.status(404).json("invalid email or password ")
    }
  } catch (error) {
    res.status(401).json(`login API failed!!! ${error}`)
  }
}

//get all hospitals
exports.viewAllHospitals = async (req, res) => {
  console.log(req.payload,"asdasd")
  console.log("inside hospital view")
  try {
    
    const getallhospitals = await users.find({ usertype: "Hospital" })
    if(getallhospitals){
    res.status(200).json({
      getallhospitals

    })
  }else{
    res.status(406).json("getallhospitals value not found!!!"

    )
  }
    
  }
  catch (error) {
    res.status(401).json(`getallhospital Api failed!!!${error}`)
  }
}

// Hospital

// get user details
exports.getUserDetails = async (req, res) => {
    try {
        console.log("inside getUserDetails controller function");

        const {id}= req.params
        console.log(id);
        const userDetails = await users.find({_id:id})

        if (userDetails) {
            res.status(200).json(userDetails)
        } else {
            res.status(406).json("getUserDetails not found!!!!!")
        }
    }
    catch (err) {
        res.status(401).json(`getUserDetails API failed!!!${err}`)
    }
}