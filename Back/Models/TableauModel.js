const mongoose = require("mongoose");

const { Schema } = mongoose;

const NoteSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  color: { type: String, required: true }
});

const ColonneSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  notes: [NoteSchema]
});

const TableauSchema = new Schema({
  name: { type: String, required: true },
  colonnes: [ColonneSchema]
});

const TableauModel = mongoose.model("Liste", TableauSchema);

module.exports = TableauModel;
