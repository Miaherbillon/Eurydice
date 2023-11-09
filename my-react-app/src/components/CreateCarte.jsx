import React, { useState } from 'react';
import { useTodoProvider } from '../Context.jsx';
import axios from 'axios';

import Note from "./Cartes.jsx"

export default function CarteId({ colonneId, tableauId }) {
  const [nouvelleNoteName, setNouvelleNoteName] = useState('');
  const [nouvelleNoteQuantity, setNouvelleNoteQuantity] = useState(0);
  const [nouvelleNoteColor, setNouvelleNoteColor] = useState('');
  const [context, dispatch] = useTodoProvider();



  const ajouterNote = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:3010/ajouterNote/${tableauId}`, {
         colonneId: colonneId,
        name: nouvelleNoteName,
        quantity: nouvelleNoteQuantity,
        color: nouvelleNoteColor,
      });
      // console.log("createcarte",response.data);

      if (response.data) {
        setNouvelleNoteName('');
        setNouvelleNoteQuantity(0);
        setNouvelleNoteColor('');
          
        const nouvelleNote = [...context.listNotes, response.data.nouvelleNoteObj ];
        dispatch({ type: 'setListNote', payload: nouvelleNote });
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
      <Note colonneId={colonneId} tableauId={tableauId}/>
    </section>
  );
}
