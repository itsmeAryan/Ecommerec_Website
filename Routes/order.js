const { VerifyAdminMiddleware, AuthAndMiddleware } = require("./MiddleWare")

const Order = require("../Models.js/Order");
const Router = require("express").Router();
Router.post("/:id", AuthAndMiddleware, async (Req, res) => {
    try {
        const data = await Order.create(Req.body);
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)
    }
})
Router.put("/:id", VerifyAdminMiddleware, async (req, res) => {



    try {
        const id = req.params.id
        const data = await Order.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)
    }

});
Router.delete("/:id", VerifyAdminMiddleware, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted...")
    } catch (error) {
        res.status(404).json(error.message)
    }
})
Router.get("/find/:uid", AuthAndMiddleware, async (req, res) => {
    try {
        const data = await Order.find({ userId: req.params.uid });
        data.password = undefined;
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)
    }
})
Router.get("/all", VerifyAdminMiddleware, async (req, res) => {


    try {
        const Orders = await Order.find()

        res.status(200).json(Orders)

    } catch (error) {
        res.status(404).json(error.message)
    }
});
// stats
Router.get("/income", (async (req, res) => {
    try {
        const datae = new Date();
        const lastmonth = new Date(datae.setMonth(datae.getMonth() - 1));
        const previous = new Date(datae.setMonth(lastmonth.getMonth() - 1));

        const data = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: previous
                    }
                }

            },
            {$project:{
                month:{
                    $month:"$createdAt"
                },sales:"$amount"
            }},
            {
$group:{
    _id:"$month",
    total:{$sum:"$sales"}
}
            }
        ])
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)
    }
}))

module.exports = Router;