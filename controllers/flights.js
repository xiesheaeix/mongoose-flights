const Flight = require('../models/flight');

module.exports = {
    index,
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        resizeBy.render('flights/index', { flights });
    });
}
