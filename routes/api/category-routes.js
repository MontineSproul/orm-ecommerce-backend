const router = require('express').Router();
const { Category, Product } = require('../../models');

// api/categories
router.get('/', (req, res) => {
  Category.findAll ({
    include: [
      {
        model: Product,
        attributes: ["product_name"],
      },
    ],
  })
    .then ((dataDb) => res.json(dataDb))
    .catch((err)=> {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["product_name"],
      },
    ],
  })
  .then((dataDb) => {
    if (!dataDb) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.json(dataDb);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
  .then((dataDb) => res.json(dataDb))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
   Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      res.status(200).json(category);
    }).catch((err) => {
      console.log(err);
      res.status(400).json(err);
    })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where:{
      id: req.params.id,
    },
  })
    .then(dataDb => {
      if(!dataDb){
        res.status(404).json({ message: "User not found"})
        return;
      }
      res.status(200).json(dataDb);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;