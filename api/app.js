const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


/* All Routing File Import */
const authRouter = require('./routes/auth');


/* MIDDLEWARE functions */
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


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



/* For Running the APP */

const port = process.env.PORT || 8000;
 app.listen(port, () => {
    console.log("Server is running on PORT - "+port);
 });