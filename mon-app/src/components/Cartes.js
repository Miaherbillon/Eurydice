import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Cartes({ select }) {
  const [lecture, setLecture] = useState({ note: [] });
  const [nouvelleNote, setNouvelleNote] = useState('');

  console.log(select);

  useEffect(() => {
    const lectureNote = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/${select}`);
        console.log(response.data);
        setLecture(response.data || { note: [] }); 
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
      setLecture({ ...lecture, note: [...lecture.note, response.data.note] }); 
      setNouvelleNote('');
    } catch (error) {
      console.error('Erreur lors de la création de la note', error);
    }
  };

  const supprimerNote = async (elem) => {
    try {
      await axios.delete(`http://localhost:3010/supprimer/${select}`, {
        data: { note: elem }, 
      });
      const updatedNotes = lecture.note.filter((note) => note !== elem);
      setLecture({ ...lecture, note: updatedNotes });
    } catch (error) {
      console.error("Erreur lors de la suppression de la note", error);
    }
  };

  return (
    <section className="Carte">
      <h2>Mes notes : </h2>
      <section className="containerNote">
        <div>
        {lecture.note.length !== 0 &&
          lecture.note.map((elem, index) => {
            return (
              <button key={index} className="buttonNote">
                <p>{elem}</p>
                <button onClick={() => supprimerNote(elem)}>X</button>
              </button>
            );
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


{/* // Ne pas prendre en compte les deux autres div (en cours de création) //  */}
{/* // Celle-ci servira pour les deux autres colones dans note */}

      <div>
        {lecture.note.length !== 0 &&
          lecture.note.map((elem, index) => {
            return (
              <button key={index} className="buttonNote">
                <p>{elem}</p>
                <button onClick={() => supprimerNote(elem)}>X</button>
              </button>
            );
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

      <div>
        {lecture.note.length !== 0 &&
          lecture.note.map((elem, index) => {
            return (
              <button key={index} className="buttonNote">
                <p>{elem}</p>
                <button onClick={() => supprimerNote(elem)}>X</button>
              </button>
            );
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
      
    </section>
  );
}
