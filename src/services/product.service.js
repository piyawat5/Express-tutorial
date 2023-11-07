const productRepo = require("../repositories/product.repository");

class Product {
  constructor(id, name, image, price, stock) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.stock = stock;
  }
}

let products = [
  new Product(1, "Macbook Pro", "", 90000, 0),
  new Product(2, "iPhone XS", "", 50000, 10),
];

exports.allProducts = async () => await productRepo.findAll();

exports.allProductsPrice = async () => await productRepo.findAllPrice();

exports.findByName = async (search) => {
  if (!search) {
    return await productRepo.findAll();
  }

  return await productRepo.findByName(search);
};

exports.findByPrice = async (query) => {
  const { min, max } = query;
  return await productRepo.findByPrice(min, max);
};

exports.findById = async (id) => await productRepo.findById(id);

exports.add = async (product, file) =>
  await productRepo.postProduct({
    ...product,
    image: file ? file.filename : "",
  });

exports.edit = async (id, product, file) => {
  const result = await productRepo.findById(id);

  if (result) {
    const updated = await productRepo.putProduct(result.id, {
      ...product,
      image: file ? file.filename : result.image,
    });
    if (updated) {
      return await productRepo.findById(id);
    }
  }
  return null;
};

exports.delete = async (id) => {
  const result = await productRepo.findById(id);

  if (result) {
    const deleted = await productRepo.deleteProduct(result.id);

    if (deleted) {
      return await result;
    }
  } else {
    return null;
  }
};
