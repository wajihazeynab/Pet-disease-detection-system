const { Schema, model } = require("mongoose");

const petSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
    // enum: ["male", "female", "other"],
  },
  category: {
    type: String,
    // enum: ["Mammals", "Reptiles", "Amphibians", "Birds", "Fish", "Invertebrates", "Other"],
  },
  breed: {
    type: String,
    trim: true,
  },
  age: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  image: {
    type: String,
  },
  medicalRecord: [
    {
      type: Schema.Types.ObjectId,
      ref: "MedicalRecord",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

});

module.exports = model("pets", petSchema);
