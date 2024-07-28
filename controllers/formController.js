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

const getForm = async (req, res) => {
  const formId = req.query.formId;
  const getFormData = `form_${formId}`;
  const forms = await readDataFromFile("forms.json");
  if (forms && forms[getFormData]) {
    res.json(forms[getFormData]);
  } else {
    res.status(404).json({ message: "Form not found at getForm" });
  }
};

module.exports = {
  createForm,
  getForm,
};
