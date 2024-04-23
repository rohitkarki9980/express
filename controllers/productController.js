const Product = require('../Models/product')
//to add new product

exports.addProducts = async (req,res) =>{
    let product = await Product.create({
        title:req.body.title,
        price:req.body.price,
        description:req.body.description,
        count_in_stock:req.body.count_in_stock,
        image:req.file?.path,
        category:req.body.category, 
    })
    if(!product){
        return res.status(400).json({error:"Something went Wrong"})
    }
    res.send(product)
}

// get all products

exports.getAllProducts = async(req,res)=>{
    let products = await Product.find().populate('category','Category_name')
    if(!products){
        return res.status(400).json({error:"Something went Wrong"})
    }
    res.send(products)

}
//update
exports.updateProduct = async(req,res)=>{
    let productToUpdate = await Product.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        price:req.body.price,
        description:req.body.description,
        count_in_stock:req.body.count_in_stock,
        image:req.file?.path,
        category:req.body.category, 
    },{new:true})
    if(!productToUpdate){
        return res.status(400).json({error:"Something went Wrong"})
    }
    res.send(productToUpdate)

}



//get product by category
exports.getProductByCategory = async(req,res)=>{
    let products = await Product.findOne({category:req.params.categoryid}).populate('category','Category_name')
    if(!products){
        return res.status(400).json({error:"Something went Wrong"})
    }
    res.send(products)
}