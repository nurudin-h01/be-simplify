const express = require("express");
const usersRoutes = require("./users.routes");

const router = express.Router();

router.use("/users", usersRoutes);

module.exports = router;