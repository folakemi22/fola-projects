/*require("dotenv").config()
const router = require('express').Router();
const { json } = require('express');
const CryptoJS =  require('Crypto-js');
const user = require('../models/user');


router.post('/register', async(req, res) => {
    const newUser = new user ({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJS.AES.encrypt( 
            req.body.password, 
            process.env.SEC_
            ).toString(),

    });
    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)

    } catch(err) {
        res.status(500).json(err)

    }
    console.log(newUser);

})

router.post('/login', async(req, res) => {
    try{
        const user = user.findOne({ username : req.body.username});
       if (user == null ) {
        return res.status(400).send('cannot find user')
       }
        const hashedPassword =  CryptoJS.AES.decrypt(
            req.body.password,
            process.env.SEC_
        );

        const passcode = hashedPassword.toString(CryptoJS.enc.Utf8);
        
        
        passcode != req.body.password && 
        res.send("wrong password");

       
        const {
            password,
            ...others
        } = user._doc;
        console.log (user);


        res.status(200).json(user);


    }  
    catch{(err) => console.log(err);

    }
})
module.exports = router;

const express = require('express');
const {v4 : uuidv4} = require('uuid');
const user = require('../models/user');

const router = express.Router();

let users= [
{
        
    username: "john123;",
    password: "123doe",
    age: 24
},
{
   username: "john123;",
   password: "123doe",
   age: 23

}
]

router.get('/', (req, res) =>{
    res.send(users)
    console.log(users)
});

router.post('/', (req, res) => {
    const {username, password, age } = req.body;
    //User.push = (User);
   // res.send(`user with the nzme has been added to the database`)
    //console.log(req.body);    
    const userId = uuidv4();
    const userWithId = {
        userId,
        username,
        password,
        age
      }
      users.push(userWithId);  
      res.send('Information submitted!')
})


router.get('/:id', (req, res) => {
    const {id} = req.params;
    const findUser = users.find((users) => users.id === id)
    res.send = (findUser);
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    let user = users.filter((users) => users.id !== id);
    res.send ("Information deleted")


})

router.patch('/:id', (req, res) => {
    const{id} = req.params;
    const{ username, password, age} = req.body;
    let user = users.find((users) => user.id === id)
    if (username){ user.username = username};
    if (password){user.password = password}
    if (age){user.age = age}
    res.send ('information has been updated')
})




module.exports = router;*/