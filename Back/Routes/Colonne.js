const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const TableauModel = require("../Models/TableauModel");
const router = express.Router();

router.use(cors());
router.use(express.json());


// lire colonne

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


// création colonne
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

//supprimer colonne

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

// router.delete("/supprimerColonne", async (req, res) => {
//     try {
//         const { id, colonneId } = req.body;

//         if (!id || !colonneId) {
//             return res.status(400).json({ message: "ID de l'élément ou de la colonne manquant" });
//         }

//         const tableau = await TableauModel.findById(id);

//         if (!tableau) {
//             return res.status(404).json({ message: "Tableau non trouvé" });
//         }

//         tableau.colonnes = tableau.colonnes.filter((colonne) => colonne._id.toString() !== colonneId);

//         const updatedTableau = await tableau.save();

//         res.status(200).json({ message: "Colonne supprimée avec succès", updatedTableau });
//     } catch (error) {
//         console.error("Une erreur est survenue lors de la suppression de la colonne :", error);
//         res.status(500).json({ error: "Erreur interne du serveur" });
//     }
// });




module.exports = router;
