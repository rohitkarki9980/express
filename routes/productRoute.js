const router = require('express').Router()
const { addProducts, getAllProducts, getProductByCategory, updateProduct } = require('../controllers/productController')



router.post('/addProducts',addProducts)
router.get('/products',getAllProducts)
router.get('/productsByCategory/:id',getProductByCategory)
router.put('/updateproduct/:id',updateProduct)


module.exports = router