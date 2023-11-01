const express = require("express");
const cors = require("cors");
const TableauModel = require("../Models/TableauModel");
const router = express.Router();

router.use(cors());
router.use(express.json());

// Lecture
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
      return res.status(404).json({ message: "Élément non trouvé" });
    }
    res.status(200).json(oneListe);
  } catch (error) {
    console.error("Une erreur est survenue :", error);
    res.status(500).json({ message: "Erreur Serveur" });
  }
});

// Création
router.post("/create", async (req, res) => {
  try {
    const { name, colonnes } = req.body;

    const newTableau = new TableauModel({
      name,
      colonnes,
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
    const { colonnes } = req.body;

    if (!itemId || !colonnes) {
      return res.status(400).json({ message: "Paramètre manquant" });
    }

    const tableau = await TableauModel.findById(itemId);

    if (!tableau) {
      return res.status(404).json({ message: "Élément non trouvé" });
    }

    // Ajout de la colonne à l'objet existant
    tableau.colonnes.push(colonnes);

    const updatedTableau = await tableau.save();

    res.json(updatedTableau);
  } catch (error) {
    console.error("Une erreur est survenue lors de la modification :", error);
    res.status(500).json({ message: "Erreur Serveur" });
  }
});

// Supprimer un tableau
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

// Supprimer une colonne spécifique
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

// Ajouter une note à une colonne spécifique
router.put("/ajouterNote/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { colonneId, nouvelleNote } = req.body;

    if (!id || !colonneId || !nouvelleNote) {
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

    colonne.notes.push(nouvelleNote);

    const updatedTableau = await tableau.save();

    res.status(200).json({ message: "Note ajoutée avec succès", updatedTableau });
  } catch (error) {
    console.error("Une erreur est survenue lors de l'ajout de la note :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Supprimer une note spécifique
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
