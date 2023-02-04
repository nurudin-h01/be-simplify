const express = require("express");

const classController = require("../controllers/class.controller");

const router = express.Router();



router.get("/all", classController.getClass);
router.post("/register", classController.registerclass);


module.exports = router;