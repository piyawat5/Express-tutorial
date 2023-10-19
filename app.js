const express = require("express");
const app = express();

class Product {
  constructor(id, name, image, price, stock) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.stock = stock;
  }
}

const products = [
  new Product(1, "Macbook Pro", "", 90000, 0),
  new Product(2, "iPhone XS", "", 50000, 10),
];

app.get("/say", (req, res) => {});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/total", (req, res) => {
  const total = products.reduce((a, b) => a + b.price, 0);
  res.json({ total });
});

app.get("/products/search", (req, res) => {
  const { search } = req.query;
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

  result.length > 0 ? res.json(result) : res.status(404).json(result);
});

app.get("/products/price", (req, res) => {
  const { min, max } = req.query;
  const result = products.filter((product) => {
    const price = product.price;
    return (!min || price >= min) && (!max || price <= max);
  });

  result.length > 0 ? res.json(result) : res.status(404).json(result);
});

app.get("/products/:id", (req, res) => {
  const result = products.filter((product) => product.id == req.params.id);
  result.length > 0 ? res.json(result[0]) : res.status(404).json(null);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
  console.log("Press ctrl + c to quit.");
});
