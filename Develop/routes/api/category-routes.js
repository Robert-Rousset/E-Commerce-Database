const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product}],
    });
    res.json(allCategories)
  } catch (error) {
    res.status(500).json(error)
  }
  
});

router.get('/:id', async (req, res) => {
  try {
    const categoryById = await Category.findByPk({
      include: [{ model: Product}],
    });
    res.json(categoryById)
  } catch (error) {
    res.status(500).json(error, "No Category found with that ID")
  }
});

router.post('/', async (req, res) => {
  try {
    const createdCategory = await Category.create(req.body);
    res.status(200).json(createdCategory, "Category has been added");
  } catch (error) {
    res.status(400).json(error)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!deletedCategory){
      res.status(404).json({ message: "No Category found with that ID"});
      return
    }
    res.status(200).json(deletedCategory)
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
