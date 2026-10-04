const { Schema, model } = require("mongoose");

const timeSlot = new Schema({
    date: {
        type: String,
        required: true,
    },
    timeslots: [
        {
            time: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                enum: ['available', 'booked'],
                default: 'available',
            },
        },
    ],
});

const TimeSlot = model("timeSlots", timeSlot);

module.exports = TimeSlot;
