const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { connect } = require("./utils/dbconnect");

const corsOptions = {
  // origin: [""],
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionSuccessStatus: 200,
};
//global middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

connect();

//routes
const paintingRoutes = require("./routes/paintings.route");
const authRoutes = require("./routes/auth.route");

app.use("/paintings", paintingRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send({
    data: "server Running",
    status: 200,
  });
});

app.listen(port, () => {
  console.log("server running on port " + port);
});
