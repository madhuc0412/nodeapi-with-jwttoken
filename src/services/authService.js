const apiResponse = require('../models/apiResponse');
const { sql, poolPromise } = require('../utils/db');
const jwt = require('jsonwebtoken');
const config = require('../../config/config')();
const errorCodeEnum = require('../middleware/errorCodeEnum');
const bcrypt = require('bcryptjs');


class AuthService {

    //SignIn
    async SignIn(userDTO) {

        let apiresponse = new apiResponse();

        try {

            const pool = await poolPromise;
            const result = await pool.request()
                .input('UserEmail', sql.VarChar, userDTO.UserEmail)
                .query('select * from tbluser where UserEmail= @UserEmail');

            if (result.recordset && result.recordset != undefined && result.recordset.length > 0) {

                let user = result.recordset[0];
                var passwordIsValid = bcrypt.compareSync(userDTO.UserPassword, user.UserPassword);

                if (!passwordIsValid) {
                    apiresponse.ReturnCode = errorCodeEnum.Invalid_credentials;
                    apiresponse.ReturnMessage = 'Invalid Password.';
                } else {

                    const Token = jwt.sign({ UserEmail: user.UserEmail, UserId: user.UserId }, config.JWTSecretKey, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    apiresponse.ReturnCode = 0;
                    apiresponse.ReturnMessage = 'Success.';
                    apiresponse.RowCount = result.recordset.length;

                    let FirstName = result.recordset[0].FirstName
                    let LastName = result.recordset[0].LastName

                    apiresponse.Data = { Token, FirstName, LastName };
                }

            } else {
                apiresponse.ReturnCode = errorCodeEnum.Invalid_credentials;
                apiresponse.ReturnMessage = 'Invalid credentials.';
            }

        } catch (error) {
            apiresponse.ReturnCode = errorCodeEnum.Error_occured_while_processing;
            apiresponse.ReturnMessage = error.message;
        }

        return apiresponse;
    }



    //SignUp
    async SignUp(userDTO) {

        let apiresponse = new apiResponse();

        try {

            const hashedPassword = bcrypt.hashSync(userDTO.UserPassword, 8);

            const pool = await poolPromise;
            const result = await pool.request()
                .input('UserEmail', sql.VarChar, userDTO.UserEmail)
                .input('UserPassword', sql.VarChar, hashedPassword)
                .input('FirstName', sql.VarChar, userDTO.FirstName)
                .input('LastName', sql.VarChar, userDTO.LastName)
                .query('Insert INTO tbluser (UserEmail,UserPassword,FirstName,LastName,IsActive) VALUES (@UserEmail, @UserPassword, @FirstName, @LastName, 1)')
                .then(function (recordSet) {
                    //res.status(200).json({ status: "Success" })
                    apiresponse.ReturnCode = 0;
                    apiresponse.ReturnMessage = 'Success.';
                    apiresponse.RowCount = 1;
                });

        } catch (error) {
            apiresponse.ReturnCode = errorCodeEnum.Error_occured_while_processing;
            apiresponse.ReturnMessage = error.message;
        }

        return apiresponse;
    }

};


let authService = new AuthService();
module.exports = authService;
