const { writeDataToFile, readDataFromFile } = require("../utils/fileUtils");

const createForm = (req, res) => {
  const formId = `form_${Date.now()}`;
  console.log(req.body);

  const formData = req.body;
  const forms = readDataFromFile("forms.json") || {};
  forms[formId] = formData;

  console.log(formData);
  writeDataToFile("forms.json", forms);
  res.status(201).json({ formId, message: "Form created successfully" });
};

const getForm = (req, res) => {
  const formId = req.params.formId;
  const forms = readDataFromFile("forms.json");
  if (forms && forms[formId]) {
    res.json(forms[formId]);
  } else {
    res.status(404).json({ message: "Form not found" });
  }
};

module.exports = {
  createForm,
  getForm,
};
