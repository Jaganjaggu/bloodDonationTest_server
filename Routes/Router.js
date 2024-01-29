const express = require('express')
const router = new express.Router()
const userController = require('../Controllers/userController')
const donateController = require('../Controllers/donateController')
const requestController = require('../Controllers/requestController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')

// const donateController = require('..')

//Register API
router.post('/users/register',userController.register)

//login API
router.post('/users/login',userController.login)

// get All hospital
router.get('/users/hospital',jwtMiddleware,userController.viewAllHospitals)

//donate
router.post('/donate/donatestatus',jwtMiddleware,donateController.donateStatus)

//getpersondonatestatus
router.get('/donate/getpersondonatestatus',jwtMiddleware,donateController.getpersondonateStatus)

//requestblood

router.post('/request/bloodrequest',jwtMiddleware,requestController.requestblood)

//actions

router.get('/actions/actionstatus',jwtMiddleware,requestController.action)


// delete blood request
router.delete('/request/deletebloodrequest/:id',jwtMiddleware,requestController.deletebloodrequest)

// Hospital____________________________________

// getHospitalDonateStatus

router.get(`/hospital/donatestatus`,jwtMiddleware,donateController.getHospitalDonateStatus)

// getuserdetails
router.get(`/hospital/userdetails/:id`,jwtMiddleware,userController.getUserDetails)

// update donate status
router.put('/hospital/updatedonatestatus',jwtMiddleware,donateController.acceptRejectDonationRequest)

// get all requests
router.get(`/hospital/requests`,jwtMiddleware,requestController.getRequets)


// update request status
router.put('/hospital/updaterequestsstatus',jwtMiddleware,requestController.acceptRejectRequests)

// DashBoard

// Total Donations
router.get('/donate/total',donateController.totalDonations)

// Total Donations
router.get('/requests/total',requestController.totalRequests)


module.exports= router
