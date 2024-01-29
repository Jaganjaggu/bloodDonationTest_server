//Loads .env file contents into process.env by default.
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router=require('./Routes/Router')
require('./DB/connection')

//Creates an Express application
const bdServer = express()
bdServer.use(cors())
bdServer.use(express.json())
bdServer.use(router)

const PORT = 4000 || process.env.PORT

bdServer.listen(PORT,()=>{
    console.log(`Blood Donation Server started at port: ${PORT} and waiting for client requests!!!!`);
})
//http get request resolving to http://localhost:4000/
bdServer.get('/',(req,res)=>{
    res.send(`<h1>Blood Donation Server Started and waiting for client requests!!!</h1>`)
})





