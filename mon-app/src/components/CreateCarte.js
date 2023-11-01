import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListeCarte from '/Users/miaherbillon/Desktop/Eurydice/mon-app/src/components/Cartes.js';

export default function CarteId({ select }) {
  const [data, setData] = useState({ name: '', colonnes: [] });
  const [nouvelleNoteName, setNouvelleNoteName] = useState('');
  const [nouvelleNoteQuantity, setNouvelleNoteQuantity] = useState(0);
  const [nouvelleNoteColor, setNouvelleNoteColor] = useState('');

  useEffect(() => {
    if (!select) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/${select}`);
        setData(response.data);
      } catch (error) {
        console.error('Une erreur s\'est produite pendant la requête HTTP :', error);
      }
    };

    fetchData();

  }, [select]);

  const ajouterNote = async () => {
    try {
      const response = await axios.put(`http://localhost:3010/ajouterNote/${select}`, {
        colonneId: data.colonnes[0]._id, 
        nouvelleNote: {
          name: nouvelleNoteName,
          quantity: nouvelleNoteQuantity,
          color: nouvelleNoteColor,
        },
      });

      if (response.data) {
        console.log('Note ajoutée avec succès.');
        setNouvelleNoteName('');
        setNouvelleNoteQuantity(0);
        setNouvelleNoteColor('');
        setData(response.data.updatedTableau); 
        
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la note', error);
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
            onChange={(e) => setNouvelleNoteQuantity(parseInt(e.target.value))}
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
      <ListeCarte select={select} />
    </section>
  );
}
