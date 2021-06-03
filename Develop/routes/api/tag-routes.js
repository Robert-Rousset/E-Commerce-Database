const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product}, {model:ProductTag}],
    });
    res.json(allTags)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  try{ 
    const getTagById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product}, {model:ProductTag}],
    });
    res.json(getTagById)
  } catch (error){
    res.status(500).json(error, "No Tag found with that ID")
  }
});

router.post('/', async (req, res) => {
  try{
    const createdTag = await Tag.create(req.body)
    res.status(200).json(createdTag);
  } catch (error) {
    res.json(error)
  }
});

router.put('/:id', (req, res) => {
  try {
    const updatedTag = await Tag.update({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedTag)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!deletedTag){
      res.status(404).json({message: "No Tag found with that ID"})
      return
    }
    res.status(200).json(deletedTag)
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
