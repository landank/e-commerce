const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  Category.findAll({
      include: [Product]
    })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    include: [Product]
  })
  .then(categoryData => {
    if(!categoryData) {
      res.status(404).json({message: 'No categories found with that id'});
      return;
    };
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Category
    .create(req.body)
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: { id: req.params.id}
  })
  .then(categoryData => {
    if(!categoryData) {
      res.status(404).json({message: 'No categories found with that id'});
      return;
    }
    res.json({message: 'Category updated'});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: { id: req.params.id }
  })
  .then(categoryData => {
    if(!categoryData){
      res.status(404).json({message: 'No categories found with that id'});
      return;
    }
    res.json({message: 'Category deleted'});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;