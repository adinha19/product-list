const mongoose = require("mongoose");

exports.List = mongoose.model(
    "List",
    new mongoose.Schema(
        {
            title: { type: String },
            creator: { type: mongoose.Types.ObjectId, ref: "User" },
            products: [{
                name: { type: String },
                sum: { type: Number }
            }]
        },
        {
            timestamps: true,
        }
    )
);