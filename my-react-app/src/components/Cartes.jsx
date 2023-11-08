import React, { useState, useEffect } from "react";
import { useTodoProvider } from '../Context.jsx';
import axios from "axios";

export default function Cartes({ colonneId, tableauId }) {
  const [note, setNote] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [context, dispatch] = useTodoProvider();

//   console.log("note", colonneId + "+" + tableauId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/lireNotes/${colonneId}`);
        // console.log("response", response.data);
        dispatch({ type: "setListNote", payload: response.data });
        setNote(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des notes", error);
      }
    };
    fetchData();
  }, []);

  const supprimerNote = async (elem) => {
    try {
      const response = await axios.put(`http://localhost:3010/supprimerNote/${tableauId}/${colonneId}`, {
        note: {
          name: elem.name
        }
      });

    //   console.log("data", response.data);
      dispatch({ type: "setListNotes", payload: response.data });
    } catch (error) {
      console.error('Erreur lors de la suppression de la note', error);
    }
  };

  const toggleDetails = (noteId) => {
    if (selectedNote === noteId) {
      setSelectedNote(null);
    } else {
      setSelectedNote(noteId);
    }
  };

  return (
    <section className="Note">
      <h2>Mes notes :</h2>
      <section>
        <div>
          {note.map((elem) => (
            <div key={elem._id}>
              <p>Nom : {elem.name}</p>
              <button onClick={() => toggleDetails(elem._id)}>
                {selectedNote === elem._id ? "Masquer les détails" : "Voir les détails"}
              </button>
              {selectedNote === elem._id && (
                <div>
                  <p>Quantité : {elem.quantity}</p>
                  <p>Couleur : {elem.color}</p>
                </div>
              )}
              <button onClick={() => supprimerNote(elem)}>supprimer note</button>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
