const Flight = require('../models/flight');
const ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', { flights });
    });
}

function newFlight(req, res) {
    const newFlight = new Flight();
    const date = newFlight.departs;
    let departsDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${date.getDate().toString().padStart(2, '0')}T${date.toTimeString().slice(0, 5)}`;
    res.render('flights/new', { departsDate });
}


function create(req, res) {
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.redirect('/flights/new');
        res.redirect('/flights');
    });
}

function show(req, res) {
    let flightId = req.params.id;
    Flight.findById(req.params.id, function(err, flight) {
        ticket.find({flight: flight._id}, (err, tickets) => {
            res.render('flights/show', { title: 'Flight Details', flight, tickets });
        }); 
    });
}