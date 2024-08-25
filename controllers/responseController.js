const { writeDataToFile, readDataFromFile } = require("../utils/fileUtils");

const saveResponseDataToJsonFile = (formId, responseData) => {
  const responses = readDataFromFile("responses.json") || {};
  if (!responses) {
    responses = {};
  }

  if (responses[formId]) {
    responses[formId] = [...responses[formId], ...responseData];
  } else {
    responses[formId] = [...responseData];
  }
  writeDataToFile("responses.json", responses);
};

const saveCountData = async (formId, responseData) => {
  const summary = readDataFromFile("responseSummary.json");

  //summary에 formId가 있는지 본다.
  if (summary[formId]) {
    //있으면 count를 ++,
    summary[formId].responseCount += 1;
  } else {
    //없다면 form에서 가져온 title, count 등 넣기
    const asks = readDataFromFile("forms.json");
    summary[formId] = {
      responseCount: 1,
      title: asks[`form_${formId}`].formTitle.title,
      responses: asks[`form_${formId}`].forms.map((form) => {
        return {
          id: form.id,
          title: form.title,
          answers: form.asks.map((answer) => ({
            id: answer.id,
            name: answer.title,
            value: 0,
          })),
          count: 1,
        };
      }),
    };
  }

  responseData.forEach((data) => {
    summary[formId].responses.forEach((response) => {
      response.answers = response.answers.map((resAnswer) => {
        if (resAnswer && data.answers) {
          data.answers.forEach((answer) => {
            if (resAnswer.id === answer) {
              resAnswer.value++;
            }
          });
          data.count++;
        }
        return resAnswer;
      });
    });
  });

  console.log(summary);

  await writeDataToFile("responseSummary.json", summary);
};

const submitResponse = (req, res) => {
  const formId = `responses_${req.query.formId}`;
  const responseData = req.body;
  saveResponseDataToJsonFile(formId, responseData);
  saveCountData(req.query.formId, responseData);

  res.status(201).json({ message: "Response submitted successfully" });
};

// const getResponses = (req, res) => {
//   const formId = req.query.formId;
//   console.log("req 요청", formId);
//   const getFormData = `responses_${formId}`;
//   const responses = readDataFromFile("responses.json");
//   console.log(responses[getFormData]);
//   if (responses) {
//     if (responses[getFormData]) {
//       const foundForms = readDataFromFile("forms.json");
//       const formsData = foundForms[`form_${formId}`];
//       const populatedForm = responses[getFormData].map((form) => ({
//         ...form,
//         title: formsData.formTitle.title,
//         answers: form.answers.map((answerId) => {
//           const foundFormAsksData = formsData.forms.find((form) => form.id);
//           return {
//             id: answerId,
//             title: foundFormAsksData.asks.find((form) => form.id).title,
//           };
//         }),
//       }));

//       return res.status(200).json(populatedForm);
//     }
//     res.status(200).json({ message: "Form data not found" });
//   } else {
//     res.status(404).json({ message: "Form not found" });
//   }
// };

const getResponseSummary = (req, res) => {
  console.log("요약 응답 보냄");
  const formId = req.query.formId;
  const summary = readDataFromFile("responseSummary.json");
  if (summary && summary[formId]) {
    console.log(summary);

    res.status(200).json({
      data: summary[formId],
    });
  } else {
    res.status(404).json({ message: "Form not found" });
  }
};

module.exports = {
  submitResponse,
  getResponseSummary,
};
