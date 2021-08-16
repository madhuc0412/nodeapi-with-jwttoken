const apiResponse = require('../models/apiResponse');
const { sql, poolPromise } = require('../utils/db');
const config = require('../../config/config')();
const errorCodeEnum = require('../middleware/errorCodeEnum');

class UserService {

    async GetUsers() {

        let apiresponse = new apiResponse();

        try {

            const pool = await poolPromise;
            const result = await pool.request()
                .query('select * from tbluser');

            if (result.recordset && result.recordset != undefined && result.recordset.length > 0) {

                apiresponse.ReturnCode = 0;
                apiresponse.ReturnMessage = 'Success.';
                apiresponse.RowCount = result.recordset.length;

                apiresponse.Data = result.recordset;

            } else {
                apiresponse.ReturnCode = errorCodeEnum.No_Records_Found;
                apiresponse.ReturnMessage = 'No Records Found.';
            }

        } catch (error) {
            apiresponse.ReturnCode = errorCodeEnum.Error_occured_while_processing;
            apiresponse.ReturnMessage = error.message;
        }

        return apiresponse;
    }


}

let userService = new UserService();
module.exports = userService;