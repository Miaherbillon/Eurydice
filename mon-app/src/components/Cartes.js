import React, { useState } from 'react';
import axios from 'axios';

export default function Cartes({ select }) {
  const [notes, setNotes] = useState([]);
  const [nouvelleNote, setNouvelleNote] = useState('');

//   console.log(select);

  const ajouterNote = async () => {
    try {
      const response = await axios.put(`http://localhost:3010/modifier/${select}`, { note: nouvelleNote });
      setNotes([...notes, response.data]);
      setNouvelleNote('');
    } catch (error) {
      console.error("Erreur lors de la création de la note", error);
    }
  };

  return (
    <section className="Carte">
      <h2>Je suis dans cartes</h2>
      <div>
        <div>
          <input
            type="text"
            value={nouvelleNote}
            onChange={(e) => setNouvelleNote(e.target.value)}
            placeholder="Contenu de la nouvelle note"
          />
          <button onClick={ajouterNote}>Ajouter une note</button>
        </div>
      </div>
    </section>
  );
}
