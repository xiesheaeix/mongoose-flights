const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
            let today = new Date();
            let yr = today.getFullYear();
            let month = today.getMonth();
            let day = today.getDate();
            let oneYrFromToday = new Date(yr + 1, month, day);
            return oneYrFromToday;
        },
    }
});

module.exports = mongoose.model('Flight', flightSchema);