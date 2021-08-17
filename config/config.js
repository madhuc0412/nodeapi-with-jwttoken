//satic data to don't have to generate the conf_adata 2 times
let config_data = null

module.exports = function () {
    // if the static data was already set. return it
    if (config_data != null && config_data != undefined) {
        return config_data
    }

    config_data = {}

    config_data.PortNo = process.env.AppPortNo || "4500",
        config_data.HostURL = process.env.AppHostURL || "localhost",
        config_data.DB_Server = process.env.DBServer || "H-AWADSQL001",
        config_data.DB_Name = process.env.DBName || "adventureworks2014",
        config_data.DB_UserName =  process.env.DBUserName ||"sa",
        config_data.DB_Password =  process.env.DBPassword ||"Azureadmin@123",
        config_data.JWTSecretKey = process.env.JWTSecretKey ||"MySecret",
        config_data.JWTExpirySeconds = process.env.JWTExpirySeconds ||"86400"



    //LOAD FROM ENV VARIABLES
    // config_data.connection_string = process.env.connection_string
    // config_data.port = process.env.port || config_data.port


    return config_data
}


