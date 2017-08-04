
module.exports = function(app){

    app.get('/', function(req, res) {
        res.render('./pages/main.ejs');
    });

    app.get('/about', function(req, res) {
        res.render('./pages/about.ejs');
    });
    app.get('/contact', function(req, res) {
        res.render('./pages/contact.ejs');
    });
    // app.post('/contact', function(req, res) {
    //     res.render('./pages/contact.ejs');
    // });
    app.get('/hobbies', function(req, res) {
        res.render('./pages/hobbies.ejs');
    });
    app.get('/projects', function(req, res) {
        res.render('./pages/projects.ejs');
    });
    app.get('/trading', function(req, res) {
        res.render('./pages/trading.ejs');
    });
    app.get('/skills', function(req, res) {
        res.render('./pages/skills.ejs');
    });



    //OTHER
    app.get('/resume', function(req, res) {
        var file = "public/pdf/Aaron Hammer's Resume.pdf"
        res.download(file); // Set disposition and send it.
    });

    app.get('*', function(req, res){
        res.status('404').render('./pages/404.ejs');
    });

};
