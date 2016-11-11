const routes = require('require-all')

module.exports = (app) => {
    // Initializes all Routes placed in routes
    var allRoutes = routes({
        dirname     :  __dirname + '/routes',
        recursive   : true,
        resolve: (route) => {
            return route(app)
        }
    });
}