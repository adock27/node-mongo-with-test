const express = require("express");

const { upload, uploadFile } = require('../controllers/FileController');

const router = express.Router();

router.route("/").post(upload, uploadFile);

module.exports = router;