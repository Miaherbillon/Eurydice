import React, { useState } from 'react';
import axios from 'axios';

export default function Cartes(props) {
  const [notes, setNotes] = useState([]);
  const [nouvelleNote, setNouvelleNote] = useState('');

  const ajouterNote = async () => {
    try {
      const response = await axios.post(`http://localhost:3010/${props._id}`, { note: nouvelleNote });
      setNotes([...notes, response.data]);
      setNouvelleNote('');
    } catch (error) {
      console.error("Erreur lors de la création du tableau", error);
    }
  }

  return (
    <section className="Carte">
      <h2>Je suis dans cartes</h2>
      <div>
        <div>
          <input
            type="text"
            value={nouvelleNote}
            onChange={(e) => setNouvelleNote(e.target.value)}
            placeholder="Nom de la nouvelle note"
          />
          <button onClick={ajouterNote}>Ajouter une note</button>
        </div>
      </div>
    </section>
  );
}
