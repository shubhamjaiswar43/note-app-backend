const swaggerAutogen = require("swagger-autogen")();
const doc = {
    info:{
        title:'Note App',
        decription:'Documentation Of Note App Using Swagger'
    },
    host:'localhost:5000'
};
const outputFile = './swagger-output.json';
const routes = ['./routes/*.js'];
swaggerAutogen(outputFile,routes,doc);