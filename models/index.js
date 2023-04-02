// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsto(Category, {
  foreignKey: 'category_id',
});
// Categories have many Products
Category.hasmany(Product, {
  foreignKey: 'category_id',
});
// Products belongToMany Tags (through ProductTag)
Product.belongstomany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
})
// Tags belongToMany Products (through ProductTag)
Tag.belongToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
