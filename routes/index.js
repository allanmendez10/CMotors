const { Router } = require("express");
const router = Router();
const multer = require("multer");
//var maxSize = 1 * 1000 * 1000;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

//var upload = multer({ storage: storage, limits: { fileSize: maxSize } })
var upload = multer({ storage: storage });

//User
const {
  getUsers,
  getUserById,
  createUser,
} = require("../controllers/index.controller");

router.get("/api/v1/user/", getUsers);

router.get("/privacity_police", (req, res) => {
  res.render("privacity_police", {
    title: "About Me",
    name: "Andrew Mead",
  });
});

router.post("/api/v1/user/login", getUserById);
//router.post('/user/register', createUser);
router.post("/api/v1/user/register", upload.single("user_image"), createUser);

//Company
const {
  getCompanies,
  getCompanyById,
  createCompany,
} = require("../controllers/company.controller");
router.post("/api/v1/company/getCompanies", getCompanies);
router.post("/api/v1/company/getCompanyById", getCompanyById);
router.post("/api/v1/company/register", createCompany);

//Items
const {
  getItemsByIdCompany,
  getItems,
  createItem,
} = require("../controllers/item.controller");
router.get("/api/v1/item/:idCompany", getItems);
router.get("/api/v1/item/getItems/:id_company", getItemsByIdCompany);
router.post("/api/v1/item/register", createItem);

module.exports = router;
