const { List } = require("../models/List");
const { errorHandler } = require("../utils/errorHandler");

const createList = async (req, res, next) => {

    const creator = req.user._id
    const { title, products } = req.body

    let isExistingTitle = await List.findOne({ title });
    if (isExistingTitle) {
        let error = errorHandler(res, 400, "List with that title already exists!");

        return next(error);
    }

    const list = new List({
        title,
        products,
        creator
    })

    await list.save()
        .then(re => res.json(re))
        .catch(() => {
            let error = errorHandler(res, 400, "Can't create list at the moment");

            return next(error);
        })
}

const editList = async (req, res, next) => {
    const id = req.params.id
    const { title, products } = req.body

    let isExistingTitle = await List.findOne({ title });

    if (!isExistingTitle) {
        let error = errorHandler(res, 400, "No such list");

        return next(error);
    }

    if (isExistingTitle._id != id) {
        let error = errorHandler(res, 409, "List with that title already exists!");

        return next(error);
    }

    await List.findByIdAndUpdate(id, { title: title, products: products })
        .then(re => res.json(re))
        .catch(() => {
            let error = errorHandler(res, 400, "No such list");

            return next(error);
        })
}

const deleteList = async (req, res, next) => {
    const id = req.params.id

    await List.findByIdAndDelete(id)
        .then(res.json({ success: true }))
        .catch(() => {
            let error = errorHandler(res, 400, "No such list");

            return next(error);
        })
}

const getProductsByDate = async (req, res, next) => {
    let userId = req.user._id

    let { startDate, endDate } = req.params

    await List.aggregate([
        { $match: { creator: userId, updatedAt: { $gte: new Date(startDate), $lt: new Date(endDate) } } },
        //find documents that match the conditions
        { $project: { _id: 0, products: 1 } },
        //get fields we need, without id
        { $unwind: "$products" },
        //unwind arrays so we now have one array with all elements
        { $group: { _id: "$products.name", total: { $sum: "$products.sum"} } }
        //group elements if product name is same, sum their sum
    ])
        .then(response => res.json(response))
        .catch((err) => {
            let error = errorHandler(res, 400, "Can't find list at the moment");

            return next(error);
        })
}

exports.createList = createList
exports.editList = editList
exports.deleteList = deleteList
exports.getProductsByDate = getProductsByDate