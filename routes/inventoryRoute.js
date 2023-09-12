const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createInventoryController, getAllInventoryController, getDonorsController, getHospitalController, getOrganizationController, gettOrgnaizationForHospitalController, getInventoryHospitalController, getRecentInventoryController } = require('../controller/inventoryController');

const router = express.Router();

// create inventory 
router.post('/create-inventory', authMiddleware, createInventoryController)

//get all inventory records
//router.get('/get-inventory/:organizationId', authMiddleware, getAllInventoryController)
router.get('/get-inventory', authMiddleware, getAllInventoryController)

// post hospital records
router.post('/get-inventory-hospital', authMiddleware, getInventoryHospitalController)

// get donors records
router.get('/get-donors', authMiddleware, getDonorsController)

// get hospital records
router.get('/get-hospitals', authMiddleware, getHospitalController)

// get organization records
router.get('/get-organization', authMiddleware, getOrganizationController)

//GET orgnaisation RECORDS
router.get("/get-organization-for-hospital", authMiddleware, gettOrgnaizationForHospitalController);

// get recent inventory
router.get('/get-recent-inventory', authMiddleware, getRecentInventoryController)
module.exports = router;
