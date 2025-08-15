const express = require("express");
const { userRegistration } = require("../controllers/auth.controller");

const router = express.Router();

router.put("/register/:email", userRegistration);

module.exports = router;
