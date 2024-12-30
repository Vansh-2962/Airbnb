const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const download = require("image-downloader");
const path = require("path");
const Places = require("../models/places.model");
const Bookings = require("../models/bookings.model");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(200).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "Registered successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    return res.status(200).json({ message: "Logged In", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfull" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

exports.me = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.uploadByUrl = async (req, res) => {
  try {
    const { photoUrl } = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    if (!photoUrl) {
      return res.status(400).json({ message: "No URL provided" });
    }
    const options = {
      url: photoUrl,
      dest: path.join(__dirname, `../uploads/${newName}`),
    };
    const { filename } = await download.image(options);
    return res.status(200).json({ message: "Image uploaded ", newName });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.uploadPhotoFromDevice = async (req, res) => {
  try {
    const uploadedFiles = req.files.map((file) => file.filename);
    const files = req.files;
    return res.status(200).json(uploadedFiles);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addPlace = async (req, res) => {
  try {
    const {
      title,
      address,
      price,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      addedPhotos,
    } = req.body;
    const place = await Places.create({
      title,
      address,
      price,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      photos: addedPhotos,
      owner: req.user._id,
    });
    res.status(200).json({ message: "Added successfully", place });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getPlaces = async (req, res) => {
  try {
    const places = await Places.find({ owner: req.user._id });
    return res.status(200).json(places);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getPlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Places.findById(id);
    if (!place) {
      return res.status(400).json({ message: "Place not found" });
    }
    return res.status(200).json(place);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.editPlace = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      address,
      price,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      addedPhotos,
    } = req.body;
    const place = await Places.findById(id);
    if (!place) {
      return res.status(400).json({ message: "Place not found" });
    }
    place.title = title;
    place.address = address;
    place.description = description;
    place.perks = perks;
    place.price = price;
    place.extraInfo = extraInfo;
    place.checkIn = checkIn;
    place.checkOut = checkOut;
    place.maxGuests = maxGuests;
    place.photos = addedPhotos;
    await place.save();
    return res.status(200).json(place);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.removePhoto = async (req, res) => {
  try {
    const { id, filename } = req.params;
    const place = await Places.findById(id);
    if (!place) {
      return res.status(400).json({ message: "Place not found" });
    }
    place.photos = place.photos.filter((photo) => photo !== filename);
    await place.save();
    return res
      .status(200)
      .json({ message: "Photo removed successfully", place });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllPlaces = async (req, res) => {
  try {
    const places = await Places.find({});
    if (!places) {
      return res.status(400).json({ message: "No places found" });
    }
    return res.status(200).json(places);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.bookPlace = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      placeId,
      price,
      checkIn,
      checkOut,
      maxGuests,
      name,
      email,
      contact,
    } = req.body;
    const place = await Places.findById(placeId);
    if (!place) {
      return res.status(400).json({ message: "Place not found" });
    }
    const booking = await Bookings.create({
      placeId,
      price,
      checkIn,
      checkOut,
      maxGuests,
      name,
      email,
      contact,
      user: userId,
    });
    return res.status(200).json({ message: "Booked successfully", booking });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Bookings.find({ user: req.user._id }).populate({
      path: "placeId",
      populate: "owner",
    });

    if (!bookings) {
      return res.status(400).json({ message: "No bookings found" });
    }
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
