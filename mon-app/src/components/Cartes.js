import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Cartes({ select, indexElem }) {
  const [lecture, setLecture] = useState();
  const [affiche, setAffiche] = useState(false);
  const [loading,setLoading]=useState(false)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/${select}`);
        setLecture(response.data);
        setLoading(true)
      } catch (error) {
        console.error("Une erreur s'est produite pendant la requête HTTP :", error);
      }
    };

    fetchData();
  }, [select, lecture]);

// console.log(lecture)

  const supprimerNote = async (elem) => {
    try {
      const response = await axios.put(`http://localhost:3010/supprimerNote/${select}`, {
        note: { name: elem.name }
      });

      console.log(response.data);

      if (lecture && lecture.colonnes) {
        const updatedColonnes = lecture.colonnes.map((col) => {
          const updatedNotes = col.notes.filter((note) => note.name !== elem.name);
          return { ...col, notes: updatedNotes };
        });

        setLecture((prev) => ({ ...prev, colonnes: updatedColonnes }));
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la note', error);
    }
  };

  if (!lecture) {
    return <div>Chargement en cours...</div>;
  }

// console.log(lecture)

  return ( loading && <section className="Note">
      <h2>Mes notes :</h2>
      <section>
        <div>

          {lecture.colonnes.map((elem)=>{
            // console.log(elem)
            return <p>?</p>
          })}
          {/* {lecture &&
            lecture.colonnes &&
            lecture.colonnes.length !== 0 &&
            lecture.colonnes.map((col, index) => (
              <div key={index}>
                {col.notes.map((note, noteIndex) => (
                  <div key={noteIndex}>
                    <button
                      onClick={() => {
                        setAffiche(!affiche);
                      }}
                    >
                      {note.name}
                    </button>
                    {affiche && (
                      <div>
                        <p>Quantité : {note.quantity}</p>
                        <p>Couleur : {note.color}</p>
                      </div>
                    )}
                    <button onClick={() => supprimerNote(note)}>Supprimer</button>
                  </div>
                ))}
              </div>
            ))} */}
        </div>
      </section>
    </section>
  );
}
