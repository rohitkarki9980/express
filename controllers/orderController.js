const Order = require('../Models/orderModel')
const orderItems = require('../Models/orderItemModel')

//placeOrder
exports.placeOrder = async (req,res)=>{
    let orderItemsIds = await Promise.all(
        req.body.orderItems.map(async orderItem=>{
            let ORDERITEMS = await orderItems.Create({
                product:orderItem.product,
                quantity:orderItem.quantity
            })
            if(!ORDERITEMS){
                return res.status(400).json({error:"Failed to Place order"})
            }
            return ORDERITEMS._id
        })
    )
    let individual_total = await Promise.all(
        orderItemsIds.map(async item=>{
            let orderItem = await orderItems.findById(item).populate('product','price')
            return orderItem.product.price * orderItem.quantity
        })
    )
    let total = individual_total.reduce((a,b)=>a+b)

    let order = await Order.Create({
        orderItems:orderItemsIds,
        user:req.body.user,
        total:total,
        street:req.body.street,
        city:req.body.city,
        zipcode:req.body.zipcode,
        country:req.body.country,
        phone:req.body.phone
    })
    if(!order){
        return res.status(400).json({error:"Failed to place order"})
    }
    res.send(order)

}

