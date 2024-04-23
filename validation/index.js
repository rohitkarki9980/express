const { check, validationResult } = require('express-validator')

const categoryRules = [
    check('Category_name',"Category name is required").notEmpty()
    .isLength({min:3}).withMessage("Category must be at least 3 characters")
    .matches(/^[a-zA-z]+$/).withMessage("Category must only be alphabets")
]

const productRules = [
    check('title',"Product name is required").notEmpty()
    .isLength({min:3}).withMessage("Product name must be at least 3 characters"),
    check('price',"Product Price is required").notEmpty()
    .isNumeric().withMessage("Product price must be Number"),
    check('description',"Description is required").notEmpty()
    .isLength({min:20}).withMessage("Product name must be at least 20 characters"),
    check('count_in_stock',"Count is required").notEmpty()
    .isNumeric().withMessage("Count must be Number"),
    check('category',"Product Category is required").notEmpty()
    .matches(/^[0-9abcdef]{24}$/i).withMessage("Category error")

    
]

const userRules = [
    check('username', "Username is required").notEmpty()
    .isLength({min: 3}).withMessage("Username must at least 3 characters"),
    check('email', "Email is required").notEmpty()
    .isEmail().withMessage("Invalid email"),
    check('password', "Password is required").notEmpty()
    .matches(/[a-z]/).withMessage("Password must contain at least 1 lowercase alphabet")
    .matches(/[A-Z]/).withMessage("Password must contain at least 1 uppercase alphabet")
    .matches(/[0-9]/).withMessage("Password must contain at least 1 number")
    .matches(/[+!@#$%^&*()-]/).withMessage("Password must contain at least 1 special  character")
    .isLength({min: 8 }).withMessage("Password must be at least 8 character")
    .isLength({min: 8 }).withMessage("Password must be at least 8 character")
    .isLength({max: 30 }).withMessage("Password must be at most 30 character"),
    // check('gender', "")
    // .isIn(['male', female])
    // .isIn(['test']).not().withMessage("Test is not valid username")

]

const validationMethod =  (req,res,next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg})
    }
    next()

}

module.exports = {validationMethod,categoryRules,productRules}