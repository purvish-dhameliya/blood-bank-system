const userModel = require("../models/userModel");


// donor list
const getDonorListController = async (req, res) => {
    try {
        const donorList = await userModel.find({ role: 'donor' }).sort({ createdAt: -1 })

        return res.status(200).send({
            success: true,
            totalCount: donorList.length,
            message: "successfully get donor List",
            donorList
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error in donor list',
            error: error.message
        })
    }
}


// hospital list
const getHospitalListController = async (req, res) => {
    try {
        const hospitalList = await userModel.find({ role: 'hospital' }).sort({ createdAt: -1 })

        return res.status(200).send({
            success: true,
            totalCount: hospitalList.length,
            message: "successfully get hospital List",
            hospitalList
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error in Hospital list',
            error: error.message
        })
    }
}


// organization list
const getOrganizationListController = async (req, res) => {
    try {
        const orgList = await userModel.find({ role: 'organization' }).sort({ createdAt: -1 })

        return res.status(200).send({
            success: true,
            totalCount: orgList.length,
            message: "successfully get organization List",
            orgList
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error in organization list',
            error: error.message
        })
    }
}

// delelte donor
const deleteDonorsController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "Delete Donor Successfully",

        })
    } catch (error) {
        console.log('error', error)
        return res.status(500).send({
            success: false,
            message: "delete erorr",
            error: error.message
        })
    }
}


// delelte hospital
const deleteHospitalController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "Delete Hospital Successfully",

        })
    } catch (error) {
        console.log('error', error)
        return res.status(500).send({
            success: false,
            message: "delete erorr",
            error: error.message
        })
    }
}

// delelte organization
const deleteOrganizationController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "Delete Organization Successfully",

        })
    } catch (error) {
        console.log('error', error)
        return res.status(500).send({
            success: false,
            message: "delete erorr",
            error: error.message
        })
    }
}

module.exports = {
    getDonorListController,
    getHospitalListController,
    getOrganizationListController,
    deleteDonorsController,
    deleteHospitalController,
    deleteOrganizationController,
    deleteOrganizationController
}