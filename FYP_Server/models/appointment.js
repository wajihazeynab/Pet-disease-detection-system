const { Schema, model } = require("mongoose");

const appointmentSchema = Schema(
  {
    vetId: {
      type: Schema.Types.ObjectId,
      ref: 'Vet',
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    appointmentdate: {
      type: String,
      required: true,
    },
    appointmenttimeSlot: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

module.exports = model("Appoinment", appointmentSchema);
