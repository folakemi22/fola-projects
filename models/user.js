const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: [true, 'username must contain numbers,letters and periods'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'password must contain numbers,letters and periods'],
        unique: true
    },

    email: {
        type: String,
        required: [true, 'email must contain numbers,letters and periods'],
        unique: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
},
    {timestamp: true}
);


module.exports= mongoose.model('user', userSchema);