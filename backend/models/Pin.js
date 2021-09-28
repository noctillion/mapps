const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const PinSchema = new mongoose.Schema(
  {
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
    cummulatedDistance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

PinSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("Pin", PinSchema);
