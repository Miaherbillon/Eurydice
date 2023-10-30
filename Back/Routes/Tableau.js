const TableauModel = require("../Models/TableauModel");
const express = require("express");
const cors = require("cors");
const router = express.Router();

router.use(cors());

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

    if (!itemId || !newNote) {
      return res.status(400).json({ message: "Paramètre manquant" });
    }

    const tableau = await TableauModel.findById(itemId);

    if (!tableau) {
      return res.status(404).json({ message: "Élément non trouvé" });
    }

    tableau.note.push(newNote); 

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


//supprimer une note spécifique
router.put("/supprimerNote/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const noteToRemove = req.body.note;

    if (!itemId || !noteToRemove) {
      return res.status(400).json({ message: "Paramètre manquant" });
    }

    const tableau = await TableauModel.findById(itemId);

    if (!tableau) {
      return res.status(404).json({ message: "Élément non trouvé" });
    }

    tableau.note = tableau.note.filter((note) => note !== noteToRemove);

    const updatedTableau = await tableau.save();

    res.status(200).json({ message: "Élément supprimé avec succès", updatedTableau });
  } catch (error) {
    console.error("Une erreur est survenue lors de la suppression :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;


// Modification et suppression sont à revoir, quelques difficultés, mais surmontable.
// Car moins de pratique sur la partie Back

// Demain
// - Continuer les colonnes, les relier aux tableaux.
// - Crée les formulaires dans les notes et enregistré les éléments dans la BD
// - Refaire un peu de css (pour une meilleur mise en forme)