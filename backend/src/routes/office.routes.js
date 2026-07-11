const express = require("express");
const { listOffices } = require("../controllers/office.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(listOffices));

module.exports = router;
