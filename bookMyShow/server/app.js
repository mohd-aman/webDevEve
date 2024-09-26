const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoutes');
const movieRoute = require('./routes/movieRoutes');
const theatreRoute = require('./routes/theatreRoutes');
const showRoute = require('./routes/showRoutes');
const bookRoute = require('./routes/bookingRoutes');

require('dotenv').config();// load the environment variables

//connect to the database
connectDB(process.env.DB_URL);

const app = express();
const PORT = 8080;

app.use(helmet());

// app.use(
//     helmet.contentSecurityPolicy({
//         directives:{
//             defaultSrc:["'self'"],
//             scriptSrc:["'self", "example.com"], // allow scripts from 'self' and example.com
//             styleSrc:["'self'","'unsafe-inline'"], // allow inline styles(unsafe)
//             imgSrc:["'self'","data:","example.com"], //allow images from 'self', data urls and example.com,
//             connectSrc:["'self'","api.example.com"],//allow connections with self and example.com,
//             fontSrc:["'self'","fonts.googleapis.com"], // allow fonts from googleapis.com,
//             frameSrc:["'self'","example.com"], // allow iframes from 'self' and example.com,
//             objectSrc:["'none'"], // no objects allowed
//             upgradeInsecureRequests:[],// upgrade insecure requets to https
//         }
//     })
// )

//sanitize user input to prevent mongodb operator injection
app.use(mongoSanitize());

//rate limit middleware
const apiLimiter = rateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max:100,// Limit each IP to 100 requests per windowsMs
    message:"Too many requests from this IP, Please try agian later after 15 minutes."
})

app.use(express.json());//parse incoming json request
app.use(cors());// allowing CORS requests

//apply rate limiter middleware
app.use('/api/',apiLimiter);

app.use('/api/user',userRoute)
app.use('/api/movie',movieRoute)
app.use('/api/theatre',theatreRoute);
app.use('/api/show',showRoute);
app.use('/api/booking',bookRoute)



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})