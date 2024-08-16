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

const getFormLists = async (req, res) => {
  const formLists = await readDataFromFile("forms.json");
  const listKeys = Object.keys(formLists);
  const withoutPrefix = listKeys.map((key) => ({
    key: key.split("_")[1],
    title: formLists[key].formTitle,
  }));
  console.log(listKeys);
  res.status(200).json(withoutPrefix);
};

module.exports = {
  createForm,
  getForm,
  getFormLists,
};
