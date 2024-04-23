const { postCategory, getAllCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryControllers');
const { validationMethod, categoryRules } = require('../validation');
const router = require('express').Router();

router.post('/addCategory',categoryRules,validationMethod,postCategory);
router.get('/getAllCategories',getAllCategories)
router.get('/getCategoriesById/:id',getCategory)
router.put('/categoryToUpdate/:id',updateCategory)
router.delete('/delete/:id', deleteCategory)

module.exports = router;
