/*
 * A service that adds a status http endpoint
 * to check if the server is alive for monitoring purposes
 */
exports.postMessage = function(message) {
    
    var serviceFile = new File(module.filename);
    var handlerFile = new File(serviceFile.parent, "./handlers.js");
    
    switch(message.name){
        case "httpServerDidStart":
            /*
                - Add ping request handler
            */
            httpServer.addRequestHandler("^/status", handlerFile.path, "statusHandler");
            break;
        case "httpServerWillStop":
            /*
                - Remove ping request handler
            */
            httpServer.removeRequestHandler("^/status", handlerFile.path, "statusHandler");
            break;
    }
}
