const mongoose = require("mongoose");

exports.User = mongoose.model(
    "User",
    new mongoose.Schema(
        {
            email: { type: String, unique: true, required: true },
            password: { type: String, required: true },
        },
        {
            timestamps: true,
        }
    )
);