const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');

/* All Routing File Import */
const authRouter = require('./routes/auth');
const userRouter = require('./routes/userRoute');

/* MIDDLEWARE functions */
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(expressValidator()); // For DATA VAlidation
app.use(cookieParser()); // For Saving JWT COOKIES


/* Connect to DB */
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to DB");
})
.catch((err) => {
    console.log(err);
});


/* Routing */
app.use('/api', authRouter);
app.use('/api', userRouter);


/* For Running the APP */
const port = process.env.PORT || 8000;
 app.listen(port, () => {
    console.log("Server is running on PORT - "+port);
 });