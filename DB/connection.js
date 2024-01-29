const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log('Mongo Db atlas connected successfully!!!')
}).catch((err)=>{
    console.log(`Mongo Db atlas connection failed!!! ${err}`);

})