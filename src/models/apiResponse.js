function apiResponse(ReturnCode, ReturnMessage,ServerDate,RowCount, ResponseTime, Data
    ) {       // Accept name and age in the constructor
    this.ReturnCode = ReturnCode || 0;
    this.ReturnMessage  = ReturnMessage  || null;
    this.ServerDate = ServerDate || new Date();
    this.RowCount = RowCount || 0;
    this.ResponseTime = ResponseTime || 0;
    this.Data = Data || null
}

apiResponse.prototype.getReturnCode = function() {
    return this.ReturnCode;
}

apiResponse.prototype.setReturnCode = function(ReturnCode) {
    this.ReturnCode = ReturnCode;
}

apiResponse.prototype.getReturnMessage = function() {
    return this.ReturnMessage;
}

apiResponse.prototype.setReturnMessage = function(ReturnMessage) {
    this.ReturnMessage = ReturnMessage;
}

apiResponse.prototype.getServerDate = function() {
    return this.ServerDate;
}

apiResponse.prototype.setServerDate = function(ServerDate) {
    this.ServerDate = ServerDate;
}


apiResponse.prototype.getRowCount = function() {
    return this.RowCount;
}

apiResponse.prototype.setRowCount = function(RowCount) {
    this.RowCount = RowCount;
}


apiResponse.prototype.getResponseTime = function() {
    return this.ResponseTime;
}

apiResponse.prototype.setResponseTime = function(ResponseTime) {
    this.ResponseTime = ResponseTime;
}

apiResponse.prototype.getData = function() {
    return this.Data;
}

apiResponse.prototype.setData = function(Data) {
    this.Data = Data;
}

apiResponse.prototype.fill = function(newFields) {
    for (var field in newFields) {
        if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
            if (this[field] !== 'undefined') {
                this[field] = newFields[field];
            }
        }
    }
};


module.exports = apiResponse;     // Export the apiResponse function as it is