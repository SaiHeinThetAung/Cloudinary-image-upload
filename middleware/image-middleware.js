const fs = require("fs");
const multer = require("multer");
const path = require("path");

// Define your absolute path
const uploadDir = path.join("D:", "personal-learn", "nodejs", "Auth-api", "uploads");

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const checkfilefilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image."));
  }
};

module.exports = multer({
  storage: storage,
  fileFilter: checkfilefilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});
