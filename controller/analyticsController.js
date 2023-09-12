
const mongoose= require('mongoose');
const inventoryModel = require('../models/inventoryModel');


const bloodGroupDetailsController = async (req, res) => {
    try {
        const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
        const bloodGroupData = [];
        const organization = new mongoose.Types.ObjectId(req.userId);
        //get single blood group
        await Promise.all(
            bloodGroups.map(async (bloodGroup) => {
                //COunt TOTAL IN
                const totalIn = await inventoryModel.aggregate([
                    {
                        $match: {
                            bloodGroup: bloodGroup,
                            inventoryType: "in",
                            organization,
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            total: { $sum: "$quantity" },
                        },
                    },
                ]);
                //Count total outt
                const totalOut = await inventoryModel.aggregate([
                    {
                        $match: {
                            bloodGroup: bloodGroup,
                            inventoryType: "out",
                            organization,
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            total: { $sum: "$quantity" },
                        },
                    },
                ]);
                //calcultr out
                const availabeBlood =
                    (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

                //PUSH DATA
                bloodGroupData.push({
                    bloodGroup,
                    totalIn: totalIn[0]?.total || 0,
                    totalOut: totalOut[0]?.total || 0,
                    availabeBlood,
                });
            })
        );

        return res.status(200).send({
            success: true,
            message: "Blood Group Data Fetch Successfully",
            bloodGroupData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Bloodgroup Data Analytics API",
            error,
        });
    }
}

module.exports = {
    bloodGroupDetailsController
}