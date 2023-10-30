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
    console.error("Une erreur est survenue lors de la lecture :", error);
    res.status(500).json({ error: "Erreur lors de la lecture." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oneListe = await TableauModel.findById(id);
    if (!oneListe) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(oneListe);
  } catch (error) {
    console.error("Une erreur est survenue :", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Create
router.post("/create", async (req, res) => {
  try {
    const { name, note } = req.body;

    const newTableau = new TableauModel({
      name,
      note,
    });

    const createdTableau = await newTableau.save();

    res.status(201).json(createdTableau);
  } catch (error) {
    console.error("Une erreur est survenue lors de la création du tableau :", error);
    res.status(500).json({ error: "Erreur lors de la création du tableau." });
  }
});

// Modifier
router.put("/modifier/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const newNote = req.body.note;

    if (itemId && newNote) {
      const tableau = await TableauModel.findById(itemId);

      if (!tableau) {
        return res.status(404).json({ message: "Item not found" });
      }

      tableau.note.push(newNote); // Ajouter la nouvelle note à la fin du tableau

      const updatedTableau = await tableau.save();

      res.json(updatedTableau);
    } else {
      res.status(400).json({ message: "Paramètre manquant" });
    }
  } catch (error) {
    console.error("Une erreur est survenue lors de la modification :", error);
    res.status(500).json({ message: "Erreur Serveur" });
  }
});

// Delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const noteId = req.params.noteId;

    if (noteId) {
      const tableau = await TableauModel.findById(itemId);

      if (!tableau) {
        return res.status(404).json({ message: "Item not found" });
      }

      const index = tableau.note.findIndex((note) => note._id.toString() === noteId);

      if (index === -1) {
        return res.status(404).json({ message: "Note not found" });
      }

      tableau.note.splice(index, 1); // Supprimer l'élément du tableau

      const updatedTableau = await tableau.save();

      res.status(200).json({ message: "Élément supprimé avec succès", updatedTableau });
    } else {
      const deletedItem = await TableauModel.findByIdAndDelete(itemId);
      if (!deletedItem) {
        return res.status(404).json({ message: "Item not found" });
      }

      res.status(200).json({ message: "Élément supprimé avec succès" });
    }
  } catch (error) {
    console.error("Une erreur est survenue lors de la suppression :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;
