const express = require('express');
const { getDonorListController, getHospitalListController, getOrganizationListController, deleteDonorsController, deleteOrganizationController, deleteHospitalController } = require('../controller/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/donor-list', authMiddleware, adminMiddleware, getDonorListController)
router.get('/hospital-list', authMiddleware, adminMiddleware, getHospitalListController)
router.get('/org-list', authMiddleware, adminMiddleware, getOrganizationListController)

router.delete('/delete-donor/:id', authMiddleware, adminMiddleware, deleteDonorsController)

router.delete('/delete-hospital/:id', authMiddleware, adminMiddleware, deleteHospitalController)

router.delete('/delete-org/:id', authMiddleware, adminMiddleware, deleteOrganizationController)
module.exports = router;
