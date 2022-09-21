const jwt = require("jsonwebtoken"); 
const user = require("../models/user");


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        jwt.verify(token, process.env.JWT_KEY, (err, user))
            if (err) res.status(403).json('Token is not valid')
            req.user = user;
            next();
    } else {
        return res.status(401).json('user is not verified')

    }
};


module.exports = verify;