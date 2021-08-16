const jwt = require('jsonwebtoken');
const apiResponse = require('../models/apiResponse');
const errorCodeEnum = require('../middleware/errorCodeEnum');
const config = require('../../config/config')();




module.exports = (req, res, next) => {
    let apiresponse = new apiResponse();

    const authHeader = req.get('Authorization');
    if (!authHeader) {
        // const error = new Error('Not authenticated.');
        // error.statusCode = 401;
        // throw error;
        apiresponse.ReturnCode = errorCodeEnum.Token_Missing;
        apiresponse.ReturnMessage = 'Token is missing.';
        return res.json(apiresponse);
    } else {

        const token = authHeader.split(' ')[1];
        let decodedToken;

        try {
            decodedToken = jwt.verify(token, config.JWTSecretKey);
        } catch (err) {
            apiresponse.ReturnCode = errorCodeEnum.Token_Invalid;
            apiresponse.ReturnMessage = 'Token is Invalid.';
            return res.json(apiresponse);
        }

        if (!decodedToken) {
            apiresponse.ReturnCode = errorCodeEnum.Token_Invalid;
            apiresponse.ReturnMessage = 'Token is Invalid.';
            return res.json(apiresponse);
        }
        req.UserEmail = decodedToken.UserEmail;
        req.UserId = decodedToken.UserId;
        next();
    }

};
