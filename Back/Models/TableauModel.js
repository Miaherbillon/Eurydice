const mongoose = require("mongoose");

const TableauModel = mongoose.model("Liste", {
  name: { type: String, required: true },
  colonnes: [{ 
    _id:
    name: { type: String, required: true },
    notes: [{
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      color: { type: String, required: true }
    }]
  }]
});

module.exports = TableauModel;

