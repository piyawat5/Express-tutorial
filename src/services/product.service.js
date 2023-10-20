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

exports.allProducts = () => products;

exports.allProductsPrice = () => products.reduce((a, b) => a + b.price, 0);

exports.findByName = (search) => {
  if (!search) {
    return res.json(products);
  }
  //strict search
  //   const result = products.filter((product) => {
  //     return product.name.toLowerCase().includes(search.toLowerCase());
  //   });

  const result = products.filter((product) => {
    const productName = product.name.toLowerCase();
    const searchTerm = search.toLowerCase();

    for (let char of searchTerm) {
      return !productName.includes(char) ? false : true;
    }
    return true;
  });

  return result;
};

exports.findByPrice = ({ min, max }) =>
  products.filter(
    (product) =>
      (!min || product.price >= min) && (!max || product.price <= max)
  );

exports.findById = (id) => products.filter((product) => product.id == id);

exports.add = ({ name, price, stock }) => {
  let product = new Product(products.length + 1, name, "", price, stock);
  products = [...products, product];

  return product;
};

exports.edit = ({ id, name, price, stock }) => {
  const findIndex = products.findIndex((product) => product.id == id);
  if (findIndex !== -1) {
    products[findIndex] = { ...products[findIndex], name, price, stock };
    return products[findIndex];
  }
  return null;
};

exports.delete = (id) => {
  const findIndex = products.findIndex((product) => product.id == id);

  if (findIndex !== -1) {
    products.splice(findIndex, 1);
    return id;
  }
  return id;
};
