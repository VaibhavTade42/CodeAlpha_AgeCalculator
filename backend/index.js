const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./Models/db');
const AuthRouter = require('./Routes/AuthRouter')
const AgeCalculatorRouter = require('./Routes/AgeCalculatorRouter')
const app = express();

const PORT = process.env.PORT || 9090;

app.get("/ping", (req, res)=>{
    res.send("PONG");
})

app.use(bodyParser.json());

app.use(cors());
app.use('/auth' ,AuthRouter);
//app.use('/age-calculator' ,AgeCalculatorRouter);

app.listen(PORT, ()=>{
    console.log(`Server is listening at ${PORT}`);
})
