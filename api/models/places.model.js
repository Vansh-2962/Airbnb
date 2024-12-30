const mongoose = require("mongoose");
const placesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  perks: [{ type: String, required: true }],
  extraInfo: { type: String, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  maxGuests: { type: Number, required: true },
  photos: [{ type: String, required: true }],
  price: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Places = mongoose.model("Places", placesSchema);
module.exports = Places;
