const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors());
const ConnectDb = require('./db')
ConnectDb();
const routes = require('./routes/routes')


app.use("/api" , routes);

















app.listen(3000,()=>{
    console.log("Server connected ")
})