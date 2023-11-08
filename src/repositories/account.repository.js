const db = require("../db/models");

exports.add = async (account) => await db.Accounts.create(account);

exports.findByUsername = async (username) =>
  await db.Accounts.findOne({
    where: {
      username,
    },
  });
