const express = require("express");
const app = express();

//Middlewares
app.use(express.json());

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

app.post("/products", (req, res) => {
  const { name, price, stock } = req.body;
  let product = new Product(products.length + 1, name, "", price, stock);

  products = [...products, product];

  res.status(201).json(product);
});

app.put("/products/:id", (req, res) => {
  const { name, price, stock } = req.body;
  let findIndex = products.findIndex((product) => product.id == req.params.id);
  if (findIndex !== -1) {
    products[findIndex] = { ...products[findIndex], name, price, stock };
    res.json(products[findIndex]);
  } else {
    res.status(404).json(null);
  }
});

app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const findIndex = products.findIndex((product) => product.id == id);

  if (findIndex !== -1) {
    products.splice(findIndex, 1);
    res.status(204).json({ id });
  } else {
    res.status(404).json({ id });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
  console.log("Press ctrl + c to quit.");
});
