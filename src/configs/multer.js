const multer = require("multer");
const fs = require("fs");

exports.keyUpload = "image";

exports.upload = {
  storage: multer.diskStorage({
    destination: (req, file, next) => {
      const folder = "./images/";
      !fs.existsSync(folder) ? fs.mkdirSync(folder) : next(null, folder);
    },
    filename: (req, file, next) => {
      const ext = file.mimetype.split("/")[1];
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      next(null, `${file.fieldname}${uniqueSuffix}.${ext} `);
    },
  }),
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, next) => {
    const image = file.mimetype.startsWith("image/");

    image
      ? next(null, true)
      : next({ message: "Oops, file must be image " }, false);
  },
};
