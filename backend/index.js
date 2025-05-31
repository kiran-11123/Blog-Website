const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors());
const ConnectDb = require('./db')
const dotenv = require('dotenv')
dotenv.config();
ConnectDb();
const routes = require('./routes/routes')


app.use("/api" , routes);

















app.listen(3000,()=>{
    console.log("Server connected ")
})