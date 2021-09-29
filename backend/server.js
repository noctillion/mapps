const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
let cors = require("cors");

// routes

const pinRoute = require("./routes/pins");
const corridorRoute = require("./routes/corridors");

// dotenv
dotenv.config();

/// cors
app.use(cors());

// json

app.use(express.json());

// mongo db
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => console.log(error));

////////////////////////////////
app.use("/api/pins", pinRoute);
app.use("/api/corridor", corridorRoute);

///  server connection
app.listen(8800, () => {
  console.log("backend running");
});
