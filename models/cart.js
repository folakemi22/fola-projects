const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema ({
    userId: {
        type: String,
        required: true
    },

    products:[{
        productsId:{
            type: String,
        },
        quantity:{
            type: String,
            default:1
        },
    }] 
},
    {timestamp: true}
);


module.exports= mongoose.model('cart', cartSchema)