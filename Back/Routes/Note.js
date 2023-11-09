const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const TableauModel = require("../Models/TableauModel");
const router = express.Router();

router.use(cors());
router.use(express.json());


//lire les notes

router.get("/lireNotes/:colonneId", async (req, res) => {
    try {
        const { colonneId } = req.params;

        if (!colonneId) {
            return res.status(400).json({ message: "ID de la colonne manquant" });
        }

        const tableau = await TableauModel.findOne({ "colonnes._id": colonneId });

        if (!tableau) {
            return res.status(404).json({ message: "Tableau non trouvé" });
        }

        const colonne = tableau.colonnes.find((col) => col._id.toString() === colonneId);

        if (!colonne) {
            return res.status(404).json({ message: "Colonne non trouvée" });
        }

        res.status(200).json(colonne.notes);
    } catch (error) {
        console.error("Une erreur est survenue lors de la lecture des notes :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});


// Ajouter une note 

router.put("/ajouterNote/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { colonneId, name, quantity, color } = req.body;

        if (!id || !colonneId || !name || !quantity || !color) {
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

        res.status(200).json({ nouvelleNoteObj });
    } catch (error) {
        console.error("Une erreur est survenue lors de l'ajout de la note :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

// supprimer une note

router.put("/supprimerNote/:tableauId/:colonneId", async (req, res) => {
    try {
        const { tableauId, colonneId } = req.params;
        const { note } = req.body;

        if (!tableauId || !colonneId || !note) {
            return res.status(400).json({ message: "ID du tableau, de la colonne ou de la note manquant" });
        }

        const tableau = await TableauModel.findById(tableauId);

        if (!tableau) {
            return res.status(404).json({ message: "Tableau non trouvé" });
        }

        const colonne = tableau.colonnes.id(colonneId);

        if (!colonne) {
            return res.status(404).json({ message: "Colonne non trouvée dans le tableau" });
        }

        colonne.notes = colonne.notes.filter((n) => {
            if (n.name === note.name) {
                return false;
            }
            return true;
        });

        await tableau.save();

        res.status(200).json({ message: "Note supprimée avec succès", tableau });
    } catch (error) {
        console.error("Une erreur est survenue lors de la suppression de la note :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});




module.exports = router;
