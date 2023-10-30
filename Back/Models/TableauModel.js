const mongoose = require("mongoose");

const TableauModel = mongoose.model("Liste", {
  name: String,
});

module.exports = TableauModel;