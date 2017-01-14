/**
 * /sample
 *
 * Sample Route
 *
 * All routes have to expose a function to Standard module.exports that takes the express-app as an argument
 *
 * File-Handling:
 * Each Route has its own file, that takes care of all necessary Requests to this Route (GET / POST / DELETE / PUT ...)
 *
 * Naming:
 * Route: /some/important/route => Filename: some-important-route.js
 */

module.exports = (app) => {
    app.get('/sample', (req, res) => {
        res.send('Sample route')
    })
}
