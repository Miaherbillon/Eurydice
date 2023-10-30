const mongoose = require("mongoose");

const TableauModel = mongoose.model("Liste", {
     _id:String,
  name: String,
  note : String
});

module.exports = TableauModel;