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

app.get("/products/price", (req, res) => {
  const { min, max } = req.query;
  const result = products.filter((product) => {
    const price = product.price;
    if (min && max) {
      return price >= min && price <= max;
    } else if (min) {
      return price >= min;
    } else if (max) {
      return price <= max;
    } else {
      return product;
    }
  });
  res.json(result);
});

app.get("/products/:id", (req, res) => {
  const result = products.filter((product) => product.id == req.params.id);
  result.length > 0 ? res.json(result[0]) : res.json(null);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
  console.log("Press ctrl + c to quit.");
});
