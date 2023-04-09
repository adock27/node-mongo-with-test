const express = require("express");


const { upload, uploadFile, removeFile } = require('../controllers/FileController');

const router = express.Router();

router.route("/").post(upload, uploadFile);
router.route("/remove").post(removeFile);


module.exports = router;