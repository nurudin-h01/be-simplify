const express = require("express");
const usersRoutes = require("./users.routes");
const classRoutes = require("./class.routes");

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/class", classRoutes);

module.exports = router;