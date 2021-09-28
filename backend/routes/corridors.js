const router = require("express").Router();

const Corridor = require("../models/Corridor");

/* /// create a landmark from
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (error) {
    res.status(500).json(error);
  }
}); */

// retrieve corridor

router.get("/", async (req, res) => {
  try {
    const corridors = await Corridor.find();
    res.status(200).json(corridors);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
