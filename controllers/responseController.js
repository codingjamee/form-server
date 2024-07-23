const { writeDataToFile, readDataFromFile } = require("../utils/fileUtils");

const submitResponse = (req, res) => {
  const formId = req.params.formId;
  const responseData = req.body;
  const responses = readDataFromFile("responses.json") || {};
  if (!responses[formId]) {
    responses[formId] = [];
  }
  responses[formId].push(responseData);
  writeDataToFile("responses.json", responses);
  res.status(201).json({ message: "Response submitted successfully" });
};

const getResponses = (req, res) => {
  const formId = req.params.formId;
  const responses = readDataFromFile("responses.json");
  if (responses && responses[formId]) {
    res.json(responses[formId]);
  } else {
    res.status(404).json({ message: "Form not found" });
  }
};

const getResponseSummary = (req, res) => {
  const formId = req.params.formId;
  const responses = readDataFromFile("responses.json");
  if (responses && responses[formId]) {
    const totalResponses = responses[formId].length;
    const genderDistribution = responses[formId].reduce((acc, response) => {
      const gender = response.gender;
      if (gender) {
        acc[gender] = (acc[gender] || 0) + 1;
      }
      return acc;
    }, {});

    res.json({
      totalResponses,
      genderDistribution,
    });
  } else {
    res.status(404).json({ message: "Form not found" });
  }
};

module.exports = {
  submitResponse,
  getResponses,
  getResponseSummary,
};
