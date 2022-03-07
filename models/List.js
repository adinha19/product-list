const mongoose = require("mongoose");

exports.List = mongoose.model(
    "List",
    new mongoose.Schema(
        {
            title: { type: String, unique: true, required: true },
            creator: { type: mongoose.Types.ObjectId, ref: "User" },
            products: [{
                name: { type: String, required: true },
                sum: { type: Number, required: true }
            }]
        },
        {
            timestamps: true,
        }
    )
);