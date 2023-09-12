const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");




// const createInventoryController = async (req, res) => {
//     try {
//         const { email, inventoryType } = req.body;

//         // Validate
//         console.log("REQ BODY:", req.body);
//         const user = await userModel.findOne({ email });
//         console.log("USER:", user);

//         if (!user) {
//             return res.status(404).send({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         // if (inventoryType === "in" && user.role !== "donor") {
//         //     throw new Error('Not a Donor Account');
//         // }
//         // if (inventoryType === "out" && user.role !== "hospital") {
//         //     throw new Error('Not a Hospital');
//         // }

//         if (req.body.inventoryType === 'out') {
//             const requestedBloodGroup = req.body.bloodGroup;
//             const requestedQuantityOfBlood = req.body.quantity;
//             const organization = new mongoose.Types.ObjectId(req.body.userId)

//             // calculate total blood quantitys
//             const totalInOfRequestedBlood = await inventoryModel.aggregate([
//                 {
//                     $match: {
//                         organization,
//                         inventoryType: 'in',
//                         bloodGroup: requestedBloodGroup
//                     }
//                 }, {
//                     $group: {
//                         _id: `$bloodGroup`,
//                         total: { $sum: `$quantity` }
//                     }
//                 }
//             ])
//             // console.log('Total In:', totalInOfRequestedBlood)

//             const totalIn = totalInOfRequestedBlood[0].total || 0

//             // calculated OUT blood quantity
//             const totalOutRequestedBlood = await inventoryModel.aggregate([
//                 {
//                     $match: {
//                         organization,
//                         inventoryType: 'out',
//                         bloodGroup: requestedBloodGroup
//                     }
//                 }, {
//                     $group: {
//                         _id: `$bloodGroup`,
//                         total: { $sum: `$quantity` }
//                     }
//                 }
//             ])
//             const totalOut = totalOutRequestedBlood[0].total || 0

//             //in && out calculation
//             const availableBloodGroup = totalIn - totalOut

//             if (availableBloodGroup < requestedQuantityOfBlood) {
//                 return res.status(500).send({
//                     success: false,
//                     message: `Only ${availableBloodGroup} ML of ${requestedBloodGroup.toUpperCase()} is available`
//                 })
//             }
//             req.body.hospital = user?._id;
//         }
//         // Save record
//         const inventory = new inventoryModel(req.body);
//         await inventory.save();

//         return res.status(201).send({
//             success: true,
//             message: "New Blood Record Added",
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({
//             success: false,
//             message: "Error in create Inventory",
//             error: error.message,
//         });
//     }
// };

// get all records
const createInventoryController = async (req, res) => {
    try {
        const { email } = req.body;
        //validation
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User Not Found");
        }
        // if (inventoryType === "in" && user.role !== "donar") {
        //   throw new Error("Not a donar account");
        // }
        // if (inventoryType === "out" && user.role !== "hospital") {
        //   throw new Error("Not a hospital");
        // }

        if (req.body.inventoryType == "out") {
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantityOfBlood = req.body.quantity;
            const organization = new mongoose.Types.ObjectId(req.userId);
            //calculate Blood Quanitity
            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                {
                    $match: {
                        organization,
                        inventoryType: "in",
                        bloodGroup: requestedBloodGroup,
                    },
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            // console.log("Total In", totalInOfRequestedBlood);
            const totalIn = totalInOfRequestedBlood[0]?.total || 0;

            //calculate OUT Blood Quanitity
            const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
                {
                    $match: {
                        organization,
                        inventoryType: "out",
                        bloodGroup: requestedBloodGroup,
                    },
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            const totalOut = totalOutOfRequestedBloodGroup[0]?.total;
            console.log('totalOut', totalOut)
            //in & Out Calc
            const availableQuantityOfBloodGroup = totalIn - totalOut;
            console.log('availableQuan', availableQuantityOfBloodGroup)
            //quantity validation
            if (availableQuantityOfBloodGroup <= requestedQuantityOfBlood) {
                return res.status(500).send({
                    success: false,
                    message: `Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
                });
            }

            req.body.hospital = user?._id;
        } else {
            req.body.donor = user?._id;
        }

        //save record
        const inventory = new inventoryModel(req.body);
        await inventory.save();
        return res.status(201).send({
            success: true,
            message: "New Blood Record Added",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Errro In Create Inventory API",
            error,
        });
    }
};

const getAllInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({})
        console.log('invertory::::', inventory)

        return res.status(200).send({
            success: true,
            message: "Get Inventory Record Successfully",
            inventory
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        })
    }
}

// get blood for hospital
const getInventoryHospitalController = async (req, res) => {
    try {
        const inventory = await inventoryModel
            .find(req.body.filters)
            .populate("donor")
            .populate("hospital")
            .populate("organization")
            .sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            messaage: "get hospital comsumer records successfully",
            inventory,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Get consumer Inventory",
            error,
        });
    }
};

// get recent inventory controller 
const getRecentInventoryController = async (req,res) => {
    try {
        const inventory = await inventoryModel.find({organization: req.userId}).limit(5).sort({createdAt:-1})
        return res.status(200).send({
            success :true,
            message:"recent inventory created successfully",
            inventory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Getting Recent Consumer Records ",
            error: error.message,
        })
    }
}
// get donors 
const getDonorsController = async (req, res) => {
    try {
        const organization = req.userId;
        console.log("organization", organization);
        //find donors
        const donorId = await inventoryModel.distinct('donor', {
            organization
        })
        console.log('donorID', donorId)
        const donors = await userModel.find({ _id: { $in: donorId } })
        return res.status(200).send({
            success: true,
            message: "Donor record Fetch successfully",
            donors
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting Donor List',
            error: error.message
        })
    }
}

// get hospitals
const getHospitalController = async (req, res) => {
    try {
        const organization = req.userId;
        console.log('ORGANIZATION:::', organization)
        //get hospital id
        const hospitalId = await inventoryModel.distinct('hospital', { organization })
        console.log('HOSPITALI:::', hospitalId)
        // find hospital
        const hospitals = await userModel.find({ _id: { $in: hospitalId } })
        console.log('hospitals::::', hospitals)
        return res.status(200).send({
            success: true,
            message: "Hospital Record fetch successfuly.",
            hospitals
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'something went wrong in hospital controller',
            error
        })
    }
}

const getOrganizationController = async (req, res) => {
    try {
        const donor = req.body?.userId;
        console.log('donor:::::', donor)
        const orgId = await inventoryModel.distinct("organization", { donor });
        console.log('Organization IDs:', orgId);
        //find org
        const organization = await userModel.find({
            _id: { $in: orgId },
        });
        console.log('organization', organization)
        return res.status(200).send({
            success: true,
            message: "Org Data Fetched Successfully",
            organization,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In org",
            error,
        });
    }
}


const gettOrgnaizationForHospitalController = async (req, res) => {
    try {
        const hospital = req.userId;
        console.log('hospital:::', hospital)
        const orgId = await inventoryModel.distinct("organization", { hospital });
        console.log('orgId:::', orgId)
        //find org
        const organization = await userModel.find({ _id: { $in: orgId } });
        console.log('organization:::', organization)
        return res.status(200).send({
            success: true,
            message: "Hospital Org Data Fetched Successfully",
            organization,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Hospital ORG API",
            error,
        });
    }
}
module.exports = { createInventoryController, getAllInventoryController, getDonorsController, getHospitalController, getOrganizationController, gettOrgnaizationForHospitalController, getInventoryHospitalController ,getRecentInventoryController};