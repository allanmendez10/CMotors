const { Router } = require('express');
const router = Router();


//User 
const { getUsers, getUserById, createUser } = require('../controllers/index.controller')

router.get('/user/', getUsers);
router.post('/user/login', getUserById);
router.post('/user/register', createUser);

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