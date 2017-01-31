module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('home.ejs');
	})

	app.get('/login', function(req, res) {
    	// render the page and pass in any flash data if it exists
        res.render('credentials.ejs', { message: req.flash('loginMessage') }); 
    });

    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.get('/dashboard', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('pages/dashboard.ejs'); 
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    /*app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/index', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));*/

    app.post('/signup', function(req, res, next) {
        console.log(req.url);
        passport.authenticate('local-signup', function(err, user, info) {
            console.log("authenticate");
            console.log(err);
            console.log(user);
            console.log(info);
        })(req, res, next);
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}