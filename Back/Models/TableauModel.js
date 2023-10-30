const mongoose = require("mongoose");

const TableauModel = mongoose.model("Liste", {
  name: String,
  note : String
});

module.exports = TableauModel;