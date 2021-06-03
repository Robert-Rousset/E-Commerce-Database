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
    const categoryById = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });
    if(!categoryById){
      res.json({message: "No category found with that ID"})
    }
    res.json(categoryById)
  } catch (error) {
    res.status(500).json(error, "No Category found with that ID")
  }
});

router.post('/', async (req, res) => {
  try {
    const createdCategory = await Category.create(req.body)
    res.status(200).json(createdCategory);
  } catch (error) {
    res.json(error)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({message: "Category has been updated"})
  } catch (error) {
    res.status(500).json(error)
  }
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
    res.status(200).json({message: "Category has been deleted"})
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
