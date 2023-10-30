const mongoose = require("mongoose");

const TableauModel = mongoose.model("Liste", {
  name: String,
  note : Array
});

module.exports = TableauModel;