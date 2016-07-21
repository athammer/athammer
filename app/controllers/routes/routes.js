
module.exports = function(app){ 
    
    app.get('/', function(req, res) {
        res.render('./pages/main.ejs');
    });
    
    
    app.get('*', function(req, res){
        res.status('404').render('./pages/404.ejs');
    });
    
};