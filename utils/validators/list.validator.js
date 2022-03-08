const { errorHandler } = require('../errorHandler')

const listValidator = (req, res, next) => {
    const { title, products } = req.body

    if (!title || typeof title !== "string") {
        let error = errorHandler(res, 400, "Title is required")

        return next(error)
    }

    let validateProductName = false
    let validateProductSum = false

    if (products.length > 0) {
        for (let i = 0; i < products.length; i++) {
            if (!products[i].name) {
                validateProductName = true
                break;
            }
            if (isNaN(products[i].sum) || !products[i].sum) {
                validateProductSum = true
                break;
            }
        }
    }

    if (validateProductSum) {
        let error = errorHandler(res, 400, 'Product sum should be a number')

        return next(error)
    }
    next()
}

exports.listValidator = listValidator