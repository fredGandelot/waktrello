function logMessage(type, message){
    console.log("[" + type + "] - " + (new Date()) + " - " + message );    
}

exports.error = function(message){
    logMessage("ERROR", message);
};

exports.info = function(message){
    logMessage("INFO", message);
};