const productServices = require("../services/product.service");

exports.getProducts = (req, res) => {
  res.json(productServices.allProducts());
};

exports.getProductByTotal = (req, res) => {
  const result = productServices.allProductsPrice();
  res.json({ result });
};

exports.getProductsBySearch = (req, res) => {
  const { search } = req.query;
  if (!search) {
    res.json(productServices.allProducts);
  } else {
    const result = productServices.findByName(search);
    result.length > 0 ? res.json(result) : res.status(404).json(result);
  }
};

exports.getProductByPrice = (req, res) => {
  const { min, max } = req.query;
  const result = productServices.findByPrice({ min, max });
  result.length > 0 ? res.json(result) : res.status(404).json(result);
};

exports.getProduct = (req, res) => {
  const id = req.params.id;
  const result = productServices.findById(id);
  result.length > 0 ? res.json(result[0]) : res.status(404).json(null);
};

exports.addProduct = (req, res) => {
  const { name, price, stock } = req.body;
  res.status(201).json(productServices.add({ name, price, stock }));
};

exports.editProduct = (req, res) => {
  const { name, price, stock } = req.body;
  const id = req.params.id;
  const result = productServices.edit({ id, name, price, stock });
  result ? res.json(result) : res.status(404).json(result);
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  const result = productServices.delete(id);
  result ? res.json(result) : res.status(404).json(result);
};
