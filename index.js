const express = require("express");
const app = express();
const path = require("path");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(require("./routes/index"));
app.use(express.static("public"));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
