const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const vehicleRoutes = require("./routes/vehicles");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
