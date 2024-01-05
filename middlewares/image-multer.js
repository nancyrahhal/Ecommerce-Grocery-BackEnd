import multer from "multer";

// Create a storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
  // filename: (req, file, cb) => {
  //   cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  // },
});

const upload = multer({ storage });
export default upload;
