require("dotenv").config()
const router = require('express').Router();
const { json } = require('express');
const CryptoJS =  require('Crypto-js');
const user = require('../models/user');
const verify = require('../roures/verifytoken');
const user = require("../models/user");

router.put("/:id", verify, async(req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SEC_
            ).toString();
        }
        try {
            const updateUser = await user.findByIdAndUpdate(
                req.params.id, { $set: req.body }, {new: true}
            );
            res.status(201).json(updateUser)
        } catch (error) {
            res.status(403).json(err)
        }
    } else {
        res.status(403).json('you cannot update user account')
    }
});

router.delete('/:id', verify, async(req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await user.findByIdAndDelete(req.params.id);
            res.status(200).json('user has been delated.....')
        } catch (error) {
            res.status(500).json(err);
            
        }
    } else{
        res.status(401).json('user account cannot be deleted ')

    }
});

router.get('/find/:id', async(req, res) => {
    try {
        const user = await user.findById(req.params.id);
        const { password, ...other } = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(401).json(err);
        
    }
});

router.get('/', verify, async (req, res) => {
    const query = req.query.new; 
    if  (req.user.isAdmin ) {
        try {
            const user = query
        } catch (error) {
            
        }
    }
})
module.export = router;