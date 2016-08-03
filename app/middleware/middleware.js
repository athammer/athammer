module.exports = {
    
    prettifyDomain: function(req, res, next) {
        if(req.headers && req.get('Host').slice(0, 4) === 'www.'){
            console.log("bad www.")
            var newHost = req.get('Host').slice(4);
            var secureUrlNoWWW = "https://" + newHost + req.url;
            res.writeHead(301, { "Location":  secureUrlNoWWW });
            res.end();
            return 1;
        }
        // if(!req.secure){
        //     console.log("to ssl");
        //     var secureURL = "https://" + req.hostname + req.url;
        //     res.writeHead(301, { "Location":  secureURL });
        //     res.end();  
        // } 
        next();
    }
}