require('dotenv').config();
const express = require ('express');
const candidatesRoutes = require('./routes/candidatesRoutes');
const adminRoute = require('./routes/admin');
const mongoose = require('mongoose');


//express app
const app = express()

//middleware
app.use(express.json() )

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

//routes
app.use('/api/candidates',candidatesRoutes)
app.use('/api/admin',adminRoute)

//connect to db 
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for requests
    app.listen(process.env.PORT,()=>{
    console.log('connected to db & listening on port',process.env.PORT); 
    })
    })
    .catch((error)=>{
        console.log(error);
    })


