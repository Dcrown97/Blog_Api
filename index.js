const express = require('express');
const passport = require('passport');
const authRoute = require('./routes/authRoute');
const blogRoute = require('./routes/blogRoutes');
const { connectToDb } = require('./database/db')

require("./authentication/auth") // Signup and login authentication middleware
require('dotenv').config();

const app = express()

const PORT = process.env.PORT || 3000

//connect to databse
connectToDb();

//register user with passport
// require('');

//middleware
app.use(express.json());

//protected article routes user authentication signin and login route
app.use('/blogs', passport.authenticate('jwt', { session: false }), blogRoute);
app.use('/', authRoute);

//Diplay Homepage
app.get('/', (req, res) => {    
    return res.send('Hello, Welocome to Blog Api')
})

// Handle errors.
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server Started on PORT: http://localhost:${PORT}`)
})