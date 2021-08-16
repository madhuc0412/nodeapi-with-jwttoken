const apiResponse = require('../models/apiResponse');
const authService = require('../services/authService');
const errorCodeEnum = require('../middleware/errorCodeEnum');


class AuthController {

    //Login 
    async Login(req, res, next) {
        let apiresponse = new apiResponse();
        let responsetime = new Date();

        try {

            if (req.body != null && req.body != undefined && Object.keys(req.body).length > 0) {

                const userDTO = req.body;
                apiresponse = await authService.SignIn(userDTO);

            } else {
                apiresponse.ReturnCode = errorCodeEnum.Missing_Parameters;
                apiresponse.ReturnMessage = 'Missing Parameters.';
            }

        } catch (error) {
            apiresponse.ReturnCode = errorCodeEnum.Error_occured_while_processing;
            apiresponse.ReturnMessage = 'Error occured while processing your request:  ' + error.message;
        }

        apiresponse.ResponseTime = (new Date().getTime() - responsetime.getTime()) / 1000;

        return res.json(apiresponse);
    }


    //SignUp 
    async  SignUp(req,res,next){
        let apiresponse = new apiResponse();
        let responsetime = new Date();
    
        try {
    
            if (req.body != null && req.body != undefined && Object.keys(req.body).length > 0) {
                
                const userDTO = req.body;
                apiresponse = await authService.SignUp(userDTO);
    
            } else {
                apiresponse.ReturnCode = errorCodeEnum.Missing_Parameters;
                apiresponse.ReturnMessage = 'Missing Parameters.';
            }
    
        } catch (error) {
            apiresponse.ReturnCode = errorCodeEnum.Error_occured_while_processing;
            apiresponse.ReturnMessage = 'Error occured while processing your request:  ' + error.message;
        }
    
        apiresponse.ResponseTime = (new Date().getTime() - responsetime.getTime()) / 1000;
    
        return res.json(apiresponse);
    }

}


let authcontroller = new AuthController();

module.exports = authcontroller;