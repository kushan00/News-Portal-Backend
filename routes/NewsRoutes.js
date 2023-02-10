const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const News = require("../controllers/NewsController.js"); 
const path = require("path");
const multer = require("multer");

/**
 * 
 * multer multiple image uplaod function
 * 
 */
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public')
  },
  filename: (req, file, cb) => {
     //rename filename to avoid name duplication
     var fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName)
  }
})

var upload = multer({ storage: storage });

router.post("/add",upload.array("News",10),News.addNews);
router.get("/get-News/:id",News.getNews);
router.get("/get-all",News.getNews);
router.put("/update-News/:id",upload.array("Newss",10),News.updateNews);
router.delete("/delete-News/:id",News.deleteNews)

module.exports = router;
