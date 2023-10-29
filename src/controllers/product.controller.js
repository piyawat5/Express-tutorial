const productServices = require("../services/product.service");
const multer = require("multer");
const multerConfig = require("../configs/multer");
const upload = multer(multerConfig.config).single(multerConfig.keyUpload);

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
  const result = productServices.findByPrice(req.query);
  result.length > 0 ? res.json(result) : res.status(404).json(result);
};

exports.getProduct = (req, res) => {
  const id = req.params.id;
  const result = productServices.findById(id);
  result.length > 0 ? res.json(result[0]) : res.status(404).json(null);
};

exports.addProduct = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      return res.status(500).json({ message: error.message });
    }
    return res.status(201).json(await productServices.add(req.body, req.file));
  });
};

exports.editProduct = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      return res.status(500).json({ message: error.message });
    }
    const result = await productServices.edit(
      req.params.id,
      req.body,
      req.file
    );
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({});
    }
  });
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  const result = productServices.delete(id);
  result ? res.json(result) : res.status(404).json(result);
};
