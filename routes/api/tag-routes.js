const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  Tag.findAll({
    include: [Product]
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: { id: req.params.id },
    include: [Product]
  })
  .then(tagData => {
    if(!tagData) {
      res.status(404).json({message: 'No tags found with that id'});
      return;
    }
    res.json(tagData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Tag
  .create(req.body)
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: { id: req.params.id }
  })
  .then(tagData => {
    if(!tagData) {
      res.status(404).json({message: 'No tags found with that id'});
      return;
    }
    res.json({message: 'Tag updated'})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: { id: req.params.id }
  })
  .then(tagData => {
    if(!tagData) {
      res.status(404).json({message: 'No tags found with that id'});
      return;
    }
    res.json({message: 'Tag deleted'})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;