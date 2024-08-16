const express = require("express");
const { getResponses } = require("../controllers/responseController");
const { createForm, getFormLists } = require("../controllers/formController");

const router = express.Router();

//생성한 form데이터 post
router.post("/forms", createForm);
//form에 대한 응답 get
router.get("/responses", getResponses);
//form들 목록 
router.get("/forms", getFormLists);

module.exports = router;
