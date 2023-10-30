const TableauModel = require("../Models/TableauModel");

const express = require("express");
const cors = require("cors");
const router = express.Router();

router.use(cors());

// Read
router.get("/", async (req, res) => {
  try {
    const allListes = await TableauModel.find();
    res.json(allListes);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la lecture." });
  }
});

// Create
router.post("/create", async (req, res) => {
  try {
    const { name, note } = req.body;

    const newTableau = new TableauModel({
      name,
      note
    });

    const createdTableau = await newTableau.save();

    res.status(201).json(createdTableau);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du tableau." });
  }
});

// Modifier
router.put("/modifier/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    if (itemId && req.body.note) {
      const tableau = await TableauModel.findById(itemId);
      tableau.note = req.body.note;

      await tableau.save();

      res.json(tableau);
    } else {
      res.status(400).json({ message: "Paramètre manquant" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





// Delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    await TableauModel.findByIdAndDelete(itemId);

    res.status(200).json({ message: "Élément supprimé avec succès" });
  } catch (error) {
    console.error("Une erreur est survenue lors de la suppression :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;
