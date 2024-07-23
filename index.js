const express = require("express");
const formRoutes = require("./routes/formRoutes");
const responseRoutes = require("./routes/responseRoutes");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/forms", formRoutes);
app.use("/forms", responseRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
