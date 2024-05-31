const express = require('express')
const bodyParser = require('body-parser')


//This is to use the body requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const HOST = process.env.HOST || '0.0.0.0'
const CORS_PORT = 8081
const PORT = process.env.PORT || 8080
const app = express();

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${HOST} port ${PORT}`))