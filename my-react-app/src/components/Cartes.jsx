import { useEffect, useState } from "react";
import { useTodoProvider } from '../Context.jsx';

// import CreateNote from "./CreateCarte.jsx"

import axios from "axios";

export default function Cartes({ colonneId }) {
  const [note, setNote] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [context, dispatch] = useTodoProvider();

  console.log("note", context );
console.log(colonneId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/lireNotes/${colonneId}`);
        console.log("response", response.data);
        dispatch({type:"setListNote", payload:response.data })
        setNote(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des notes", error);
      }
    };
    fetchData();
  }, [context.listNotes]);

// const supprimerNote=async (elem)=>{
//   try {
//     await axios.delete(`http://localhost:3000/supprimerNote/${colonneId}` ,{
//         note: {
//     name: elem.name
//   }
//     })
// const updatedNote = 
//   } catch (error) {
//     console.error('Erreur lors de la suppression de la note', error);
//   }
// }

  return (
    <section className="Note">
      <h2>Mes notes :</h2>
      <section>
        <div>
          {note.map((elem, index) => {
            console.log("ele","me")
            return (
              <div key={index}> 
             
                <p>Nom : {elem.name}</p>
                <button
                  onClick={() =>
                    setSelectedNote(selectedNote === elem._id ? null : elem._id)
                  }
                >
                  {selectedNote === elem._id ? "Masquer les détails" : "Voir les détails"}
                </button>
                {selectedNote === elem._id && (
                  <div>
                    <p>Quantité : {elem.quantity}</p>
                    <p>Couleur : {elem.color}</p>
                  </div>
                )}
                {/* <button onClick={supprimerNote}>supprimer note</button> */}
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}
