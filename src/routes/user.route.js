const router = require("express").Router();
const userControllers = require("../controllers/user.controller");

router.get("/", userControllers.getUsers);

router.get("/search", userControllers.getUserbyId);

router.get("/:id", userControllers.getUser);

router.post("/", userControllers.postUser);

router.put("/:id", userControllers.putUser);

router.delete("/:id", userControllers.deleteUser);

module.exports = router;
