const router = require("express").Router();

router.use("/products", require("./product.route"));
router.use("/account", require("./account.route"));
router.use("/user", require("./user.route"));

module.exports = router;
