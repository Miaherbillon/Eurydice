import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Cartes({ select }) {
  const [notes, setNotes] = useState();
  const [nouvelleNote, setNouvelleNote] = useState('');
  const [lecture, setLecture] = useState([]);

  console.log(select);

  useEffect(() => {
    const lectureNote = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/${select}`);
        console.log(response.data);
        setLecture(response.data);
      } catch (error) {
        console.error("Une erreur s'est produite pendant la requête HTTP :", error);
      }
    };

    lectureNote();
  }, [select,nouvelleNote]);

  const ajouterNote = async () => {
    try {
      const response = await axios.put(`http://localhost:3010/modifier/${select}`, {
        note: nouvelleNote,
      });
      setNotes([...notes, response.data]);
      setNouvelleNote('');
    } catch (error) {
      console.error('Erreur lors de la création de la note', error);
    }
  };

  const supprimerNote=async ()=>{
    try {
        
    } catch (error) {
        
    }
  }
console.log(lecture.note)
  return (
    <section className="Carte">
      <h2>Mes notes : </h2>
      <div>
       {lecture.length!== 0 &&
       lecture.note.map((elem, index) => {
    console.log(lecture);
    return <div key={index} className="buttonNote">
        <p>{elem}</p>
        <button>X</button></div>;
})}
     
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
