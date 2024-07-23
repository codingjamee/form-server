const express = require("express");
const {
  submitResponse,
  getResponses,
  getResponseSummary,
} = require("../controllers/responseController");

const router = express.Router();

router.post("/:formId/responses", submitResponse);
router.get("/:formId/responses", getResponses);
router.get("/:formId/summary", getResponseSummary);

module.exports = router;
