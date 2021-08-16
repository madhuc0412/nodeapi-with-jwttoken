const apiResponse = require('../models/apiResponse');
const userService = require('../services/userService');
const errorCodeEnum = require('../middleware/errorCodeEnum');


class UserController {

    //GetUser 
    async GetUsers(req, res, netx) {

        let apiresponse = new apiResponse();
        let responsetime = new Date();

        try {

            apiresponse = await userService.GetUsers();

        } catch (error) {
            apiresponse.ReturnCode = errorCodeEnum.Error_occured_while_processing;
            apiresponse.ReturnMessage = 'Error occured while processing your request:  ' + error.message;
        }

        apiresponse.ResponseTime = (new Date().getTime() - responsetime.getTime()) / 1000;

        return res.json(apiresponse);
    }


}

let userController = new UserController();
module.exports = userController;