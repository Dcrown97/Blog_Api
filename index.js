require('dotenv').config();
const express = require('express');
const authRoute = require('./routes/authRoute');
const blogRoute = require('./routes/blogRoutes');
const { connectToDb } = require('./database/db')

require("./authentication/auth") // jwt authorization middleware

const app = express()

const PORT = process.env.PORT || 3000

//connect to databse
connectToDb();

//middleware
app.use(express.json());

//routes
app.use('/api/blog', blogRoute);
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