// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.hasOne(Category)
// Products belongsTo Category

Category.hasMany(Product)
Product.belongsTo(Category)
// Categories have many Products

Product.belongsToMany(Tag, { through: ProductTag})
// Products belongToMany Tags (through ProductTag)

Tag.belongsToMany(Product, { through: ProductTag})
// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
