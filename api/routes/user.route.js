const {
  login,
  register,
  logout,
  me,
  uploadByUrl,
  uploadPhotoFromDevice,
  addPlace,
  getPlaces,
  getPlace,
  editPlace,
  removePhoto,
  getAllPlaces,
  bookPlace,
  getAllBookings,
} = require("../controllers/user.controller");
const isAuth = require("../middlewares/auth.middleware");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + Date.now() + "." + fileExtension);
  },
});

const upload = multer({ storage: storage });

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuth, me);
router.post("/upload-by-url", isAuth, uploadByUrl);
router.post(
  "/upload",
  isAuth,
  upload.array("photos", 100),
  uploadPhotoFromDevice
);
router.post("/places", isAuth, addPlace);
router.get("/places", isAuth, getPlaces);
router.get("/places/:id", isAuth, getPlace);
router.put("/places/:id", isAuth, editPlace);
router.delete("/photo/:filename/:id", isAuth, removePhoto);
router.get("/all-places", getAllPlaces);
router.post("/booking", isAuth, bookPlace);
router.get("/bookings", isAuth, getAllBookings);
module.exports = router;
