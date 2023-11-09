const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const TableauModel = require("../Models/TableauModel");
const router = express.Router();

router.use(cors());
router.use(express.json());


// Lire la liste des tableaux

router.get("/", async (req, res) => {
  try {
    const allListes = await TableauModel.find();
    const selectListes = allListes.map(tab => {
      return { name: tab.name, _id: tab._id };
    });
    res.json(selectListes);
  } catch (error) {
    console.error("Une erreur est survenue lors de la lecture :", error);
    res.status(500).json({ error: "Erreur lors de la lecture." });
  }
});

// création tableau 

router.post("/create", async (req, res) => {
  try {
    const { name, colonnes, notes } = req.body;

    const newTableau = new TableauModel({
      name,
      colonnes,
      notes,
    });

    const createdTableau = await newTableau.save();

    res.status(201).json(createdTableau);
  } catch (error) {
    console.error("Une erreur est survenue lors de la création du tableau :", error);
    res.status(500).json({ error: "Erreur lors de la création du tableau." });
  }
});

// supprimer tableau 

router.delete("/supprimer/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!itemId) {
      return res.status(400).json({ message: "ID de l'élément manquant" });
    }

    const deletedTableau = await TableauModel.findByIdAndDelete(itemId);

    if (!deletedTableau) {
      return res.status(404).json({ message: "Élément non trouvé" });
    }

    res.status(200).json({ message: "Élément supprimé avec succès", deletedTableau });
  } catch (error) {
    console.error("Une erreur est survenue lors de la suppression :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;
