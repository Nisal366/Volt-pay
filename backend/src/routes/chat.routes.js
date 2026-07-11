const express = require("express");
const { chat } = require("../controllers/chat.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post("/", asyncHandler(chat));

module.exports = router;
