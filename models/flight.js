const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },
    arrival: {
        type: Date
    }
});

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },
    airport: {
        type: String, 
        default: 'LAX',
        enum: ['LAS', 'BUR', 'LAX', 'SAN'],
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999,
    },
    departs: {
        type: Date,
        default: function() {
            const date = new Date();
            date.setFullYear(date.getFullYear() + 1);
            return date;
           },
    },
    destinations: [destinationSchema] 
});

module.exports = mongoose.model('Flight', flightSchema);