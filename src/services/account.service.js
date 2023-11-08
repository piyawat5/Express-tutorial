const accountRepo = require("../repositories/account.repository");
const bcrypt = require("bcryptjs");
const jwt = require("../configs/jwt");

exports.register = async (account) => {
  account.password = await bcrypt.hash(account.password, 8);
  return await accountRepo.add(account);
};

exports.login = async (account) => {
  const result = await accountRepo.findByUsername(account.username);
  if (result && (await bcrypt.compare(account.password, result.password))) {
    const payload = {
      sub: result.username,
      role: result.role,
      something: "anything",
    };
    return jwt.generateToken(payload);
  }
  return "";
};
