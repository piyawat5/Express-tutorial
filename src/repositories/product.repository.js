const db = require("../db/models");
const { Op } = require("sequelize");

exports.findAll = async () =>
  await db.Products.findAll({
    order: [["id", "DESC"]],
  });

exports.findById = async (id) => await db.Products.findByPk(id);

exports.findAllPrice = async () => await db.Products.sum("price");

exports.findByName = async (search) =>
  await db.Products.findAll({
    where: {
      name: {
        [Op.substring]: `%${search}%`,
      },
    },
  });

exports.findByPrice = async (min, max) =>
  await db.Products.findAll({
    where: {
      price: {
        [Op.gte]: min,
        [Op.lte]: max,
      },
    },
  });

exports.postProduct = async (product) => await db.Products.create(product);

exports.putProduct = async (id, product) =>
  await db.Products.update(product, {
    where: {
      id,
    },
  });

exports.deleteProduct = async (id) =>
  await db.Products.destroy({
    where: {
      id,
    },
  });
