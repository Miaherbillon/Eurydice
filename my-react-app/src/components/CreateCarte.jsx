import React, { useState } from 'react';
import { useTodoProvider } from '../Context.jsx';
import axios from 'axios';

export default function CarteId({ colonne, id }) {
  const [data, setData] = useState({ name: '', colonnes: [] });
  const [nouvelleNoteName, setNouvelleNoteName] = useState('');
  const [nouvelleNoteQuantity, setNouvelleNoteQuantity] = useState(0);
  const [nouvelleNoteColor, setNouvelleNoteColor] = useState('');
  const [context, dispatch] = useTodoProvider();

  console.log('id colonne', colonne);

  const ajouterNote = async () => {
    try {
      const response = await axios.put(`http://localhost:3010/ajouterNote/${colonne._id}`, {
      data: {
          colonneId: colonne[0]._id,
          name:nouvelleNoteName,
          quantity:nouvelleNoteQuantity,
          color:nouvelleNoteColor,
        }
      
      // nouvelleNote: [{
        //   name: nouvelleNoteName,
        //   quantity: nouvelleNoteQuantity,
        //   color: nouvelleNoteColor,
        // }]
        
      });

      if (response.data) {
        console.log('Note ajoutée avec succès.');
        setNouvelleNoteName('');
        setNouvelleNoteQuantity(0);
        setNouvelleNoteColor('');
        setData(response.data.updatedTableau);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la note", error);
    }
  };

  return (
    <section className="CarteId">
      <div>
        <form>
          <input
            type="text"
            value={nouvelleNoteName}
            onChange={(e) => setNouvelleNoteName(e.target.value)}
            placeholder="Nom de la nouvelle note"
          />
          <input
            type="number"
            value={nouvelleNoteQuantity}
            onChange={(e) => setNouvelleNoteQuantity(parseInt(e.target.value, 10))}
            placeholder="Quantité de la nouvelle note"
          />
          <input
            type="text"
            value={nouvelleNoteColor}
            onChange={(e) => setNouvelleNoteColor(e.target.value)}
            placeholder="Couleur de la nouvelle note"
          />
          <button type="button" onClick={ajouterNote}>
            Ajouter une note
          </button>
        </form>
      </div>
    </section>
  );
}
