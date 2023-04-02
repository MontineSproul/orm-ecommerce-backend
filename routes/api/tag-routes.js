const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags & associated product data
  Tag.findAll({
    include: [
      {
        model: Product,
      },
    ],
  })
 .then((dataDb) => res.json(dataDb))
 .catch((err) => {
  console.log(err);
  res.status(500).json(err);
 });
});

router.get('/:id', (req, res) => {
Tag.findOne({
  where: {
    id:req.params.id,
},
include: [{
  model: Product,
}],
})
.then((dataDb) => {
  if (!dataDb) {
    res.status(404).json({ message: "tag has no user data" });
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
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then((dataDb) => res.json(dataDb))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});


router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name,
  },
  { where: {
      id: req.params.id,
    },
  },
)
.then((dataDb) => {
  if (!dataDb) {
    res.status(404).json({ message: "tag has no user data" });
    return;
  }
  res.json(dataDb);
})
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
});


router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })

  .then((dataDb) => {
    if (!dataDb) {
      res.status(404).json({ message: "tag has no user data" });
      return;
    }
    res.json(dataDb);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
