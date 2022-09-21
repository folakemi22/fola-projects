require("dotenv").config()
const router = require('express').Router();
const CryptoJS =  require('Crypto-js');
const jwt = require("jsonwebtoken")
const User = require('../models/user');


router.post('/register', async(req, res) => {
    const newUser = new User ({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJS.AES.encrypt( 
            req.body.password, 
            process.env.SEC_
            ).toString(),

    });
    try{
        const user = await newUser.save();
        res.status(201).json(user)
        console.log(user);

    } catch(err) {
        res.status(500).json(err)

    }


})

router.post('/login', async(req, res) => {
    try{
        let user = await User.findOne({ username : req.body.username});
        !user && res.status(401).json("user does not exist");

        const hashedPassword =  CryptoJS.AES.decrypt( req.body.password, process.env.SEC_);

        const passcode = hashedPassword.toString(CryptoJS.enc.Utf8);
        
        
        passcode !== req.body.password && 
        res.status(500).json("wrong password");

        const accessToken = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin},
            process.env.JWT_KEY,
            {expiresIn: "7d"}
        )
        const {password,...others} = user._doc;
        console.log (user);
        res.status(200).json({...others, accessToken});


    }  
    catch(err){
        res.status(500).json(err)
    }
});
module.exports = router;