const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { errorHandler } = require("../utils/errorHandler");
require('dotenv').config();

const secret = process.env.JWT_SECRET

const signup = async (req, res, next) => {

    const { email, password } = req.body;

    /* Check if user with entered email already exists */
    let isEmailExisting = await User.findOne({ email });

    if (isEmailExisting) {
        let error = errorHandler(res, 409, "User with that email already exists!");

        return next(error);
    }

    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
        email,
        password: hashedPassword,
    });

    res.status(200).json({ success: true, user: email });
}

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email })
    //find user in db, return invalid login message if theres no user.
    if (!user) {
        let error = errorHandler(res, 401, "Invalid login")

        return next(error)
    }

    let compare = await bcrypt.compare(password, user.password)

    if (compare) {
        const payload = {
            email: user.email,
            _id: user._id,
        };
        jwt.sign(
            payload,
            secret,
            {
                expiresIn: "2h",
            },
            (err, token) => {
                res.json({
                    success: true,
                    token: "Bearer " + token,
                });
            }
        );
    } else {
        let error = errorHandler(res, 401, "Invalid login")

        return next(error)
    }
    //compare hashes, return invalid login passwords doesnt match
}

const changePassword = async (req, res, next) => {
    let userId = req.user._id
    let { password } = req.body

    let hashedPassword = await bcrypt.hash(password, 12);

    await User.findByIdAndUpdate(userId, { password: hashedPassword })
        .then((user) => res.status(200).json({ success: true, user: user.email }))
        .catch(() => {
            let error = errorHandler(res, 401, "Can't change password, please try again later")

            return next(error)
        })
}

exports.signup = signup;
exports.login = login;
exports.changePassword = changePassword