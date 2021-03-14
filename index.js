const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const publicDirectoryPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");

app.set("view engine", "hbs");
app.set("views", viewsPath);

//routes
app.use(require("./routes/index"));
app.use(express.static(publicDirectoryPath));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
