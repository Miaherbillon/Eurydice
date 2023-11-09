import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTodoProvider } from '../Util/Context.jsx';
import CreateNote from "./createNotes.jsx"


export default function Colonnes({ colonnes, id }) {
  const [nouveauName, setNouveauName] = useState('');
  const[ context, dispatch]  = useTodoProvider();



  useEffect(() => { 
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/${id}`);
        dispatch({ type: 'setListColonnes', payload: response.data.colonnes });
      } catch (error) {
        console.error('Erreur lors de la récupération des colonnes', error);
      }
    };
    fetchData();
  }, []);

const ajouterColonne = async () => {
  try {
    const resp = await axios.put(`http://localhost:3010/modifier/${id}`, {
      name: nouveauName,
      notes: []
    });

    // console.log(resp.data);

    const nouvelleColonne = [...colonnes, { name: resp.data.name, _id: resp.data._id }];
    dispatch({ type: 'setListColonnes', payload: nouvelleColonne });
    setNouveauName('');
  } catch (error) {
    console.error('Erreur lors de la création de la colonne', error);
  }
};


  const supprimerColonne = async (colonne) => {
    try {
      await axios.delete('http://localhost:3010/supprimerColonne', {
        data: {
          id: id,
          colonneId: colonne._id
        }
      });

      const updatedColonnes = colonnes.filter((c) => c._id !== colonne._id);
      dispatch({ type: 'setListColonnes', payload: updatedColonnes });
    } catch (error) {
      console.error('Une erreur est survenue lors de la suppression de la colonne :', error);
    }
  };


  // console.log(colonnes)
  return (
    <section className="Colonnes">
      <div className="blocAjoutColonne">
        <div>
          <label>
            Nouvelle colonne
            <input
              type="text"
              value={nouveauName}
              onChange={(e) => setNouveauName(e.target.value)}
              placeholder="Nom de la nouvelle colonne"
            />
            <button onClick={ajouterColonne}>Ajouter une colonne</button>
          </label>
        </div>
      </div>
     <div className="containerColonnes">
  {colonnes && colonnes.length > 0 ? (
    colonnes.map((colonne) => (
      <div key={colonne._id}>
        <h3>{colonne.name}</h3>
        <CreateNote colonneId={colonne._id} tableauId={id}/>
        <button onClick={() => supprimerColonne(colonne)} className="buttonDelete">
          Supprimer cette colonne
        </button>
      </div>
    ))
  ) : (
    <p>Aucune colonne</p>
  )}
</div>

    </section>
  );
}
