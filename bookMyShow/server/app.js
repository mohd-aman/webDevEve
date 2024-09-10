const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoutes');
const movieRoute = require('./routes/movieRoutes')

require('dotenv').config();// load the environment variables

//connect to the database
connectDB(process.env.DB_URL);

const app = express();
const PORT = 8080;

app.use(express.json());//parse incoming json request
app.use(cors());// allowing CORS requests
app.use('/api/user',userRoute)
app.use('/api/movies',movieRoute)



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})