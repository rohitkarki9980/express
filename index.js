const express = require('express');
require('dotenv').config();
require('./Database/connection');
const app = express();
const morgan = require('morgan');

let port = process.env.PORT || 6000;
app.use(morgan('dev'));


//endpoints
const TestRoute = require('./routes/testroute');
const CategoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute')
const placesRoute = require('./routes/placesRoute')
const productRoute = require('./routes/productRoute')
const orderRoute = require('./routes/orderRoutes')

app.use(express.json());

app.use(TestRoute);
app.use(orderRoute);
app.use(CategoryRoute);
app.use(userRoute)
app.use(placesRoute)
app.use(productRoute)


app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})




