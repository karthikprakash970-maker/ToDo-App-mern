const express = require("express");
const { testCont } = require("../controllers/testController");

const router = express.Router()

router.get('/',testCont)

module.exports = router