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
    //if list with same title exists, return error

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
    //create list
}

const editList = async (req, res, next) => {
    const id = req.params.id
    const { title, products } = req.body
    const user = req.user._id
    console.log(user)
    let isExistingTitle = await List.findOne({ title });
    if (isExistingTitle) {
        if (isExistingTitle._id != id) {
            let error = errorHandler(res, 409, "List with that title already exists!");

            return next(error);
        }
    }
    //if id of list that was found is not the same as current list id (incase we didnt changed title),
    //list with different id exists, return error 
    let list = await List.findById(id)
    console.log(list.creator)
    console.log(user !== list.creator)

    if (list) {
        if (!list.creator.equals(user)) {
            let error = errorHandler(res, 409, "This is not your list");
            return next(error);
        }
    }
    //if list exists and if creator is not equal to user, return error
    list.title = title
    list.products = products

    await list.save()
        .then(res.json(list))
        .catch(() => {
            let error = errorHandler(res, 400, "No such list");

            return next(error);
        })
    //update list
}

const deleteList = async (req, res, next) => {
    const id = req.params.id
    //find list by id

    await List.findByIdAndDelete(id)
        .then(res.json({ success: true }))
        .catch(() => {
            let error = errorHandler(res, 400, "No such list");

            return next(error);
        })
    //delete list
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
        { $group: { _id: "$products.name", total: { $sum: "$products.sum" } } }
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