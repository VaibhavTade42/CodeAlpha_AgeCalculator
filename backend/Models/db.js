const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_CONN;

mongoose.connect(mongoUrl)
  .then(()=>{
    console.log("MongoDB connected....")
  }).catch((err)=>{
    console.log("MongoDB Connecction Error: ", err)
  })

  // auth-db for LoginSignUp password cluster0
  //5b7xgkM4f3yCDfwc