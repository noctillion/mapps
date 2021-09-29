const mongoose = require("mongoose");

const CorridorSchema = new mongoose.Schema(
  {
    shapePoints: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Corridor", CorridorSchema);
