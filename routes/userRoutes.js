const express = require("express");
const { submitResponse } = require("../controllers/responseController");
const { getForm } = require("../controllers/formController");

const router = express.Router();

//응답할 form 데이터 get
router.get("/forms", getForm);
//생성한 form 데이터 post
router.post("/responses", submitResponse);

module.exports = router;
