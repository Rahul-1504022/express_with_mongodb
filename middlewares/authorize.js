const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    //get the token form request header
    //Authorization: Bearer <token>
    let token = req.header('Authorization');
    if (!token) {
        return res.status(400).send("Access denied because no token provided!");
    }
    //get token using spit

    token = token.split(" ")[1].trim();
    //verify the token
    try {
        const decoded = jwt.verify(token, process.env.mySecretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).send("Invalid Token!");
    }
    //Error message
}