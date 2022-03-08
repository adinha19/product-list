const mongoose = require("mongoose");

exports.User = mongoose.model(
    "User",
    new mongoose.Schema(
        {
            email: { type: String },
            password: { type: String },
        },
        {
            timestamps: true,
        }
    )
);