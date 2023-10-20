const router = require("express").Router();
const productController = require("../controllers/product.controller");

router.get("/", productController.getProducts);

router.get("/total", productController.getProductByTotal);

router.get("/search", productController.getProductsBySearch);

router.get("/price", productController.getProductByPrice);

router.get("/:id", productController.getProduct);

router.post("/", productController.addProduct);

router.put("/:id", productController.editProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
