const connectToMongoose = require('./db');
connectToMongoose();
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT || 5000; 

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require("./swagger-output.json");
app.use(cors()); 
app.use(bodyParser.json({extended:true}));

//if any request given by the user in path /api/auth or /api/note then it will handle by auth.js or note.js in routes folder
app.use('/api/auth',require('./routes/auth'));
app.use('/api/note',require('./routes/note'));
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument));

app.get('/',(req,res)=>{
    res.send("Welcome To Note App");
})

app.listen(port,()=>{
    console.log(`Server is running at http://${hostname}:${port}`);
})