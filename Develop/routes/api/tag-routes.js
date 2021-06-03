const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(allTags)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  try{ 
    const getTagById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product}],
    });
    if(!getTagById){
      res.json({message: "No Tag found with that ID"})
    }
    res.status(200).json(getTagById)
  } catch (error){
    res.status(500).json(error, {message:"No Tag found with that ID"})
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

router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({message: "Tag has been updated"})
  } catch (error) {
    res.status(500).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTagId = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!deletedTagId){
      res.status(404).json({message: "No Tag found with that ID"})
      return
    }
    res.status(200).json({message: "Tag has been deleted"})
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
