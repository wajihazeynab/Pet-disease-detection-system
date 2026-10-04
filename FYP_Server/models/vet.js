const { Schema, model } = require("mongoose");

const vetSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  licenseNumber: {
    type: String,

    unique: true,
  },
  specialization: {
    type: String,
  },
  fcmToken: {
    type: String,
  },
  workingHours: [
    {
      day: {
        type: Array,
        // enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      },
      timeSlot: {
        type: Array,
      },
    }
  ],
  image: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const Vet = model("vets", vetSchema);

module.exports = Vet;
