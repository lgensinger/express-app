var fetch = require("node-fetch");

var exports = module.exports;

/**
 * Execute HTTP request.
 * @param {string} url - request url
 * @returns {varying} - The data from response.data field.
 */
exports.request = function(url) {
    
    var _self = this;
    
    return new Promise(function(resolve, reject) {
        
        // send request to API service
        fetch(url).then(function(response) {
                            
            return response.json();
            
        }).then(function(data) {
            
            return resolve(data);
              
        }, function(error) {
            
            // reject promise
            return reject(error);
            
        }); 
        
    });
    
};