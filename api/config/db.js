const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MONGODB`);
  } catch (error) {
    console.log(`Could no connect to MONGODB ${error}`);
  }
};

module.exports = dbConnect;
