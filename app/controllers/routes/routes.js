
module.exports = function(app){ 
    
    app.get('/', function(req, res) {
        res.render('./pages/main.ejs');
    });
    
    app.get('/about', function(req, res) {
        res.render('./pages/about.ejs');
    });
    
    app.get('/projects/13chan', function(req, res) {
        res.render('./pages/13chan.ejs');
    });
    
    app.get('/projects/ELCE', function(req, res) {
        res.render('./pages/ELCE.ejs');
    });
    
    app.get('/projects/athammer', function(req, res) {
        res.render('./pages/athammer.ejs');
    });
    
    app.get('/download', function(req, res) {
        var file = "public/pdf/Aaron Hammer's Resume.pdf"
        res.download(file); // Set disposition and send it.
    });
    
    app.get('*', function(req, res){
        res.status('404').render('./pages/404.ejs');
    });
    
};