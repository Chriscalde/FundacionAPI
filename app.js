const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cors = require('cors')

//These are the routes imported for the API
const ticketRouter = require('./routes/ticket.routes');
const customerRouter = require('./routes/customer.routes');
const userRouter = require('./routes/user.routes');
const publicRouter = require('./routes/public.routes');
//This is the configuration used to connect to the DB
dotenv.config();
connectDB();


const HOST = process.env.HOST || '0.0.0.0'
const CORS_PORT = 8081
const PORT = process.env.PORT || 8080
const app = express();

//This is very important, otherwise the API requests won't work
app.use(cors({
    origin: '*'
}));

//This is to use the body requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//This are the routes used for the API
app.use('/ticket',ticketRouter);
app.use('/customer',customerRouter);
app.use('/user',userRouter);
app.use('/',publicRouter);

//We call the API in these ports
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${HOST} port ${PORT}`))

