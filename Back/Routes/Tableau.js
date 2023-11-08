const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const TableauModel = require("../Models/TableauModel");
const router = express.Router();

router.use(cors());
router.use(express.json());

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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oneListe = await TableauModel.findById(id);
    if (!oneListe) {
      return res.status(404).json({ message: "Élément non trouvé" });
    }
    res.status(200).json(oneListe);
  } catch (error) {
    console.error("Une erreur est survenue :", error);
    res.status(500).json({ message: "Erreur Serveur" });
  }
});

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

router.put("/modifier/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name } = req.body;

    if (!itemId || !name) {
      return res.status(400).json({ message: "Paramètre manquant" });
    }

    const tableau = await TableauModel.findById(itemId);

    if (!tableau) {
      return res.status(404).json({ message: "Élément non trouvé" });
    }

    const nouvelleColonne = {
      name: name,
      notes: []
    };

    tableau.colonnes.push(nouvelleColonne);

    const updatedTableau = await tableau.save();
    const insertedId = nouvelleColonne._id;


    res.json({ _id: insertedId, ...nouvelleColonne });
  } catch (error) {
    console.error("Une erreur est survenue lors de la modification :", error);
    res.status(500).json({ message: "Erreur Serveur" });
  }
});

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

router.delete("/supprimerColonne", async (req, res) => {
  try {
    const { id, colonneId } = req.body;

    if (!id || !colonneId) {
      return res.status(400).json({ message: "ID de l'élément ou de la colonne manquant" });
    }

    const tableau = await TableauModel.findById(id);

    if (!tableau) {
      return res.status(404).json({ message: "Tableau non trouvé" });
    }

    tableau.colonnes = tableau.colonnes.filter((colonne) => colonne._id.toString() !== colonneId);

    const updatedTableau = await tableau.save();

    res.status(200).json({ message: "Colonne supprimée avec succès", updatedTableau });
  } catch (error) {
    console.error("Une erreur est survenue lors de la suppression de la colonne :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

router.put("/ajouterNote/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { colonneId, nouvelleNote, quantity, color, name } = req.body;

    if (!id || !colonneId || !nouvelleNote || !quantity || !color || !name) {
      return res.status(400).json({ message: "Paramètre manquant" });
    }

    const tableau = await TableauModel.findById(id);

    if (!tableau) {
      return res.status(404).json({ message: "Tableau non trouvé" });
    }

    const colonne = tableau.colonnes.find((col) => col._id.toString() === colonneId);

    if (!colonne) {
      return res.status(404).json({ message: "Colonne non trouvée" });
    }

    const nouvelleNoteObj = {
      name: name,
      quantity: quantity,
      color: color
    };

    colonne.notes.push(nouvelleNoteObj);

    const updatedTableau = await tableau.save();

    res.status(200).json({ message: "Note ajoutée avec succès", updatedTableau });
  } catch (error) {
    console.error("Une erreur est survenue lors de l'ajout de la note :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

router.put("/supprimerNote/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    if (!id || !note) {
      return res.status(400).json({ message: "ID de l'élément ou de la note manquant" });
    }

    const tableau = await TableauModel.findById(id);

    if (!tableau) {
      return res.status(404).json({ message: "Tableau non trouvé" });
    }

    let found = false;
    for (const colonne of tableau.colonnes) {
      colonne.notes = colonne.notes.filter((n) => {
        if (n.name === note.name) {
          found = true;
          return false;
        }
        return true;
      });
    }

    if (!found) {
      return res.status(404).json({ message: "Note non trouvée" });
    }

    const updatedTableau = await tableau.save();

    res.status(200).json({ message: "Note supprimée avec succès", updatedTableau });
  } catch (error) {
    console.error("Une erreur est survenue lors de la suppression de la note :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;
