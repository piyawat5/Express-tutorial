const router = require("express").Router();
const accountController = require("../controllers/account.controller");

router.post("/register", accountController.register);

router.post("/login", accountController.login);

module.exports = router;
