const accountRepo = require("../repositories/account.repository");
const bcrypt = require("bcryptjs");

exports.register = async (account) => {
  return await accountRepo.add(account);
};
