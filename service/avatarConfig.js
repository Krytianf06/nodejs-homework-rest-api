const fs = require('fs/promises');
const path = require("path");
const multer = require("multer");
const jimp = require('jimp');

const avatarDir = path.join(__dirname, "../", "tmp");

const isAcessible = async (path) => {
    try {
      await fs.access(path);
      return true;
    } catch (e) {
      return false;
    }
};

const createFolderIfItDoesntExist = async (folder) => {
    try {
      if (!(await isAcessible(folder))) {
        await fs.mkdir(folder);
      }
    } catch (e) {
      console.log("not enough permissions");
      process.exit(1);
    }
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${avatarNumber()}avatar${file.originalname}`);
  },
  
});

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];


const uploadMiddleware = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    if (
      !extensionWhiteList.includes(extension) ||
      !mimetypeWhiteList.includes(mimetype)
    ) {
      return cb(new Error("File is the wrong format"));
    }
    return cb(null, true);
  },
  limits: {
    fileSize: 8*1024*2048,
  },
});


const avatarNumber = ()=>{
  
  const number = Math.floor(Math.random()*100)
  return number;
}

const modificationImages = (req, res, next) => {
  const { path } = req.file;
  jimp.read(path)
    .then((image) => {
      image.resize(250, 250);
      image.write(path);
      next();
    })
    .catch((e) => next(e));
};



module.exports = {
    createFolderIfItDoesntExist,
    uploadMiddleware,
    modificationImages,
};
