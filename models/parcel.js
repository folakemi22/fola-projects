const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },

    descriptions: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    categories:{
        type: String,
        required: true
    },
    size: {
        type:Number
    },
    color:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    }
},
    {timestamp: true}
);


module.exports= mongoose.model('parcel', parcelSchema);