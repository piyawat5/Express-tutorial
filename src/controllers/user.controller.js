const userServices = require("../services/user.service");

exports.getUsers = (req, res) => {
  res.json(userServices.allUser());
};

exports.getUserbyId = (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(404).json(userServices.allUser());
  }

  const result = userServices.searchId(search);

  result > 0 ? res.json(result) : res.status(404).json(null);
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  const result = userServices.findById(id);
  result ? res.json(result) : res.status(404).json(result);
};

exports.postUser = (req, res) => {
  const {
    username,
    password,
    information: { address, email, gender, birth },
  } = req.body;

  const result = userServices.addUser({
    username,
    password,
    information: { address, email, gender, birth },
  });

  res.json(result);
};

exports.putUser = (req, res) => {
  const id = req.params.id;
  const {
    username,
    password,
    information: { gender, birth, address, email },
  } = req.body;

  const result = userServices.editUser(id, {
    username,
    password,
    information: { gender, birth, address, email },
  });

  result ? res.json(result) : res.status(404).json(null);
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  const result = userServices.delete(id);

  result ? res.json(id) : res.status(404).json(id);
};
