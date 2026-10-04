const { Schema, model } = require("mongoose");

const medicineSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    frequency: {
        type: String,
        trim: true,
    },
    dose: {
        type: Number,
    },
    schedule: {
        Morning: {
            type: Boolean,
        },
        Midday: {
            type: Boolean,
        },
        Night: {
            type: Boolean,
        }
    },
    date: {
        type: String,
    },
    pet: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = model("medicines", medicineSchema);
