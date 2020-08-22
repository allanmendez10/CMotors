const { Router } = require('express');
const router = Router();
const multer = require('multer')
    //var maxSize = 1 * 1000 * 1000;


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})

//var upload = multer({ storage: storage, limits: { fileSize: maxSize } })
var upload = multer({ storage: storage })

//User 
const { getUsers, getUserById, createUser } = require('../controllers/index.controller')

router.get('/user/', getUsers);
router.post('/user/login', getUserById);
//router.post('/user/register', createUser);
router.post('/user/register', upload.single('user_image'), createUser);

//Company
const { getCompanies, getCompanyById, createCompany } = require('../controllers/company.controller')
router.post('/company/getCompanies', getCompanies);
router.post('/company/getCompanyById', getCompanyById);
router.post('/company/register', createCompany);

//Items
const { getItemsByIdCompany, getItems, createItem } = require('../controllers/item.controller')
router.get('/item/:idCompany', getItems);
router.get('/item/getItems/:id_company', getItemsByIdCompany);
router.post('/item/register', createItem);

module.exports = router