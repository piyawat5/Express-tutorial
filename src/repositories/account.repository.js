const db = require("../db/models");

exports.add = async (account) => await db.Account.create(account);
