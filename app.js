require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const parcelRoutes = require('./roures/parcel');
const authRoutes = require('./roures/auth');
const usersRoutes = require('./roures/user')
const notFound = require('./middeware/notfound');
const errorHandlerMiddleware = require('./middeware/errorhandler')
const app = express();


const PORT = process.env.PORT || 4000;



//middlewrae
app.use(express.json());
app.use('/api/parcel', parcelRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);


//routes
app.get ('/', (req, res) => {
    res.send ('halo')
})


//servers
const start = async() => {
    //mongoose.connect#
    mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((results) => console.log('connected to momgodb'))
    .catch((err) => console.log(err))

    app.listen(PORT, () => {
        console.log(`server is running on localhost:${PORT}. `)
    })
}
start()

app.use(notFound);
//app.use(errorHandlerMiddleware);
