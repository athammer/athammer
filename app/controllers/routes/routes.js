
module.exports = function(app){ 
    
    app.get('/', function(req, res) {
        res.render('./pages/main.ejs');
    });
    
    app.get('/about', function(req, res) {
        res.render('./pages/about.ejs');
    });
    
    
    
    
    //PROJECTS
    app.get('/projects/13chan', function(req, res) {
        res.render('./pages/projects/13chan.ejs');
    });
    
    app.get('/projects/ELCE', function(req, res) {
        res.render('./pages/projects/ELCE.ejs');
    });
    
    app.get('/projects/athammer', function(req, res) {
        res.render('./pages/projects/athammer.ejs');
    });
    
    
    //ABOUTME
    app.get('/aboutMe/hobbies', function(req, res) {
        res.render('./pages/aboutMe/hobbies.ejs');
    });
    
    app.get('/aboutMe/education', function(req, res) {
        res.render('./pages/aboutMe/education.ejs');
    });
    
    app.get('/aboutMe/boy-scouts', function(req, res) {
        res.render('./pages/aboutMe/boy-scouts.ejs');
    });
    
    app.get('/aboutMe/goals', function(req, res) {
        res.render('./pages/aboutMe/goals.ejs');
    });
    
    app.get('/aboutMe/personal-blog', function(req, res) {
        res.render('./pages/aboutMe/personal-blog.ejs');
    });
    
    
    //OTHER
    app.get('/download', function(req, res) {
        var file = "public/pdf/Aaron Hammer's Resume.pdf"
        res.download(file); // Set disposition and send it.
    });
    
    app.get('*', function(req, res){
        res.status('404').render('./pages/404.ejs');
    });
    
};