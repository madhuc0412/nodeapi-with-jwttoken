const apiResponse = require('../models/apiResponse');
const errorCodeEnum = require('../middleware/errorCodeEnum');




const Login = (req, res, next) => {

    let apiresponse = new apiResponse();
    let responsetime = new Date();
    let errorCodeId = 0;
    let returnMessage = '';

    try {

        if (req.body != null && req.body != undefined && Object.keys(req.body).length > 0) {

            const userDTO = req.body;

            if (errorCodeId == 0) {
                if (userDTO.UserEmail && userDTO.UserEmail != undefined && userDTO.UserEmail != '') {
                    //Add Regex validation as well. 
                } else {
                    errorCodeId = errorCodeEnum.User_Email_Required;
                    returnMessage = 'User Email is required.';
                }
            }

            if (errorCodeId == 0) {
                if (userDTO.UserPassword && userDTO.UserPassword != undefined && userDTO.UserPassword != '') {
                    //Do additional validation if required. 
                } else {
                    errorCodeId = errorCodeEnum.User_Password_Required;
                    returnMessage = 'User Password is required.';
                }
            }

        } else {
            errorCodeId = errorCodeEnum.Missing_Parameters;
            returnMessage = 'Missing Parameters.';
        }

    } catch (error) {
        errorCodeId = errorCodeEnum.Error_occured_while_processing;
        returnMessage = 'Error occured while processing your request Validation:  ' + error.message;
    }

    if (errorCodeId > 0) {
        apiresponse.ReturnCode = errorCodeId;
        apiresponse.ReturnMessage = returnMessage;
        apiresponse.ResponseTime = (new Date().getTime() - responsetime.getTime()) / 1000;

        res.json(apiresponse);

    } else {
        next();
    }
}





const SignUp = (req, res, next) => {

    let apiresponse = new apiResponse();
    let responsetime = new Date();
    let errorCodeId = 0;
    let returnMessage = '';

    try {

        if (req.body != null && req.body != undefined && Object.keys(req.body).length > 0) {

            const userDTO = req.body;

            if (errorCodeId == 0) {
                if (userDTO.UserEmail && userDTO.UserEmail != undefined && userDTO.UserEmail != '') {
                    //Add Regex validation as well. 
                } else {
                    errorCodeId = errorCodeEnum.User_Email_Required;
                    returnMessage = 'User Email is required.';
                }
            }

            if (errorCodeId == 0) {
                if (userDTO.UserPassword && userDTO.UserPassword != undefined && userDTO.UserPassword != '') {
                    //Do additional validation if required. 
                } else {
                    errorCodeId = errorCodeEnum.User_Password_Required;
                    returnMessage = 'User Password is required.';
                }
            }

        } else {
            errorCodeId = errorCodeEnum.Missing_Parameters;
            returnMessage = 'Missing Parameters.';
        }

    } catch (error) {
        errorCodeId = errorCodeEnum.Error_occured_while_processing;
        returnMessage = 'Error occured while processing your request Validation:  ' + error.message;
    }

    if (errorCodeId > 0) {
        apiresponse.ReturnCode = errorCodeId;
        apiresponse.ReturnMessage = returnMessage;
        apiresponse.ResponseTime = (new Date().getTime() - responsetime.getTime()) / 1000;

        res.json(apiresponse);

    } else {
        next();
    }
}






module.exports = {
    Login,
    SignUp
}