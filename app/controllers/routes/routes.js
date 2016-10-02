
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
    
    app.get('/aboutMe/hobbies', function(req, res) {
        res.render('./pages/hobbies.ejs');
    });
    
    app.get('/aboutMe/education', function(req, res) {
        res.render('./pages/education.ejs');
    });
    
    app.get('/aboutMe/boy-scouts', function(req, res) {
        res.render('./pages/boy-scouts.ejs');
    });
    
    app.get('/aboutMe/goals', function(req, res) {
        res.render('./pages/goals.ejs');
    });
    
    app.get('/aboutMe/personal-blog', function(req, res) {
        res.render('./pages/personal-blog.ejs');
    });
    
    app.get('/download', function(req, res) {
        var file = "public/pdf/Aaron Hammer's Resume.pdf"
        res.download(file); // Set disposition and send it.
    });
    
    app.get('*', function(req, res){
        res.status('404').render('./pages/404.ejs');
    });
    
};