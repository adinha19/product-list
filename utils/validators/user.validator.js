const validator = require("validator");
const { errorHandler } = require('../errorHandler')

const userValidator = (req, res, next) => {
    const { email, password } = req.body

    if (typeof email !== "string" || typeof password !== "string") {
        let error = errorHandler(res, 400, "Email and password should be strings.")

        return next(error)
    }
    //if email or password arent strings, return error
    let isEmail = validator.isEmail(email)

    let validateEmail = validator.isEmpty(email)

    let validatePassword = validator.isLength(password, { min: 4 })
    //check if email, or if email is empty or password doesnt have 4 characters 

    if (!isEmail || validateEmail || !validatePassword) {
        let error = errorHandler(res, 400, !isEmail && "Not an email" || validateEmail && "Email can't be empty" || !validatePassword && "Password should have minimum 4 characters")

        return next(error)
        //return errors
    }
    next()
    //if no errors, go to next middleware
}

const changePasswordValidator = (req, res, next) => {
    const { password } = req.body

    if (typeof password !== "string") {
        let error = errorHandler(res, 400, "Password is required")

        return next(error)
    }
    //check if password isnt a string

    let validatePassword = validator.isLength(password, { min: 4 })
    //validate
    if (!validatePassword) {
        let error = errorHandler(res, 400, !validatePassword && "Password should have more than 4 characters")

        return next(error)
    //return error
    }
    next()
}

exports.userValidator = userValidator
exports.changePasswordValidator = changePasswordValidator