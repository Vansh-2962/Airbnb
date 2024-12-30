const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;
const dbConnect = require("./config/db");
const userRoute = require("./routes/user.route");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/v1/user", userRoute);

app.listen(port, () => {
  dbConnect();
  console.log(`Server listening at port ${port}`);
});
