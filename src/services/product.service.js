const Product = require("../models/user.model");

const getLowStockThreshold = () => {
  const n = parseInt(process.env.LOW_STOCK_THRESHOLD || "5", 10);
  return Number.isNaN(n) ? 5 : n;
};

exports.list = async (filter = {}) => {
  return Product.find(filter).lean().exec();
};

exports.create = async (data) => {
  const doc = await Product.create(data);
  return doc.toObject();
};

exports.update = async (id, data) => {
  return Product.findByIdAndUpdate(id, data, { new: true }).lean().exec();
};

exports.remove = async (id) => {
  return Product.findByIdAndDelete(id).lean().exec();
};

exports.findById = async (id) => {
  return Product.findById(id).lean().exec();
};

exports.lowStock = async () => {
  const threshold = getLowStockThreshold();
  return Product.find({ stock: { $lt: threshold }, isActive: true })
    .lean()
    .exec();
};
