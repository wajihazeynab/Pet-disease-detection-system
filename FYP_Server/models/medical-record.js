const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const petMedicalRecordSchema = new Schema({
  pet: {
    type: Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  reasonForVisit: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
  },
  diagnosis: {
    type: String,
  },
  treatment: {
    type: String,
  },
  medications: [
    {
      name: {
        type: String,
        required: true,
      },
      dosage: {
        type: String,
      },
      duration: {
        type: String,
      },
    },
  ],
  notes: {
    type: String,
  },
});

module.exports = mongoose.model("MedicalRecord", petMedicalRecordSchema);
