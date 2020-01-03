var mysql = require('mysql');
/*
//var bodyParser = require('body-parser');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
*/

var AddRouters = function (pRouter, config) {

    var connection;

    // ROUTES FOR OUR API
    pRouter.use(function (req, res, next) {

        console.log('Connecting SQL..');

        connection = mysql.createConnection({
            port: 3306,
            host: config.sqlhost,
            database: 'sinproject',
            user: 'webuser',
            password: 'w3bsites+sql',
        });

        next(); // make sure we go to the next routes and don't stop here
    });

    pRouter.route('/ads')

        // create a bear (accessed at POST http://localhost:8080/api/bears)
        .post(function (req, res) {

        })

        // get all the bears (accessed at GET http://localhost:8080/api/bears)
        .get(function (req, res) {
            var queryString = 'SELECT * FROM ad WHERE expiration > ? ORDER BY type desc';
            var params = [new Date()]
            connection.query(queryString, params, function (err, rows, fields) {
                if (err) throw err;
                res.json(rows);
            });
            connection.end();
        });

    pRouter.route('/ads/:ad_id')

        .get(function (req, res) {

            console.log("single ad");
            var queryString = 'SELECT * FROM ad where id = ?';
            connection.query(queryString, [req.params.ad_id], function (err, result, fields) {
                if (err) throw err;
                res.json(result);
            });
            connection.end();

        })

        .post(function (req, res) {
            var queryString = 'UPDATE ad SET name = ?, description = ?, type = ? WHERE id = ?';
            var params = [req.body.name, req.body.description, req.body.type, req.body.id];
            //var params = { "name": req.params.name, "id": req.params.id, "description": req.params.description }
            connection.query(queryString, params, function (err, rows, fields) {
                if (err) throw err;
                res.json(rows);
            });
            connection.end();

        })






    pRouter.route('/ads/user/:user')

        .get(function (req, res) {
            console.log("user ads");
            var queryString = 'SELECT * FROM ad where user = ?';
            connection.query(queryString, [req.params.user], function (err, rows, fields) {
                if (err) throw err;
                res.json(rows);
            });
            connection.end();
        });

    // more routes for our API will happen here


    return pRouter;
}

module.exports.Get = AddRouters;