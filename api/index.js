const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;
const dbConnect = require("./config/db");
const userRoute = require("./routes/user.route");
const path = require("path");

const app = express();
const _dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: "https://airbnb-zrat.onrender.com",
    credentials: true,
  })
);
app.use("/api/v1/user", userRoute);
console.log(_dirname);
app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
  dbConnect();
});
