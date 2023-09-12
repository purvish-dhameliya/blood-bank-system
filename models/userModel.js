const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: ["admin", "organization", "donor", "hospital"]
    },
    name: {
        type: String,
        required: function () {
            if (this.role === "user" || this.role === "admin") {
                return true
            } else {
                return false
            }
        }
    },
    organizationName: {
        type: String,
        required: function () {
            if (this.role === "organization") {
                return true;
            } else {
                return false;
            }
        }
    },
    hospitalName: {
        type: String,
        required: function () {
            if (this.role === "hospital") {
                return true
            } else {
                return false
            }
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    website: {
        type: String,
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
    },

}, {
    timestamps: true,
})

module.exports = mongoose.model('users', userSchema)
