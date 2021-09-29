const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const PinSchema = new mongoose.Schema(
  {
    latlong: {
      type: Array,
      required: true,
    },

    cummulatedDistance: {
      type: Number,
      required: true,
    },
    newDistance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

PinSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("Pin", PinSchema);
