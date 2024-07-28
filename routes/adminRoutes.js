const express = require("express");
const { getResponses } = require("../controllers/responseController");
const { createForm } = require("../controllers/formController");

const router = express.Router();

//생성한 form데이터 post
router.post("/forms", createForm);
//form에 대한 응답 get
router.get("/responses", getResponses);

module.exports = router;
