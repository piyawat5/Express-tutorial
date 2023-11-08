const accountServices = require("../services/account.service");

exports.register = async (req, res) => {
  res.status(201).json(await accountServices.register(req.body));
};

exports.login = async (req, res) => {
  const token = await accountServices.login(req.body);
  if (!token) {
    res.status(401).json();
    return;
  }
  res.json({ token });
};

//stageless
exports.info = (req, res) => res.json({ username: req.sub, role: req.role });
