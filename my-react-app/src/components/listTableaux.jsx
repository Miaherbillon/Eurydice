import React, { useState } from 'react';
import axios from 'axios';
import { useTodoProvider } from '../Util/Context.jsx';

export default function Liste({ tableaux }) {
  const [nouveauTableau, setNouveauTableau] = useState('');
  const [context, dispatch ] = useTodoProvider();

  // console.log("liste",context);

  const ajouterTableau = async () => {
    try {
      const response = await axios.post('http://localhost:3010/create', { name: nouveauTableau });
      const updatedTableaux = [...tableaux, { ...response.data, _id: response.data._id }];
      dispatch({ type: 'setlistTab', payload: updatedTableaux });
      setNouveauTableau('');
    } catch (error) {
      console.error('Erreur lors de la création du tableau', error);
    }
  };

  const afficherMessage = (elem) => {
    dispatch({ type: 'selectTab', payload: elem._id });
    console.log(`Le tableau sélectionné est : ${elem._id}`);
  };

  const supprimeTableau = async (elem) => {
    try {
      console.log("ID de l'élément à supprimer :", elem._id);
      await axios.delete(`http://localhost:3010/supprimer/${elem._id}`);
      const updatedTableaux = tableaux.filter((t) => t._id !== elem._id);
      dispatch({ type: 'setlistTab', payload: updatedTableaux }); 
    } catch (error) {
      console.error('Erreur lors de la suppression du tableau', error);
    }
  };

  return (
    <div>
      <section className="Liste">
        <h2>Mes tableaux</h2>
        <div className="ListeCarteMap">
          {tableaux.map((tableau, index) => (
            <div key={tableau._id}>
              <button className="buttonName" onClick={() => afficherMessage(tableau)}>
                {tableau.name}
              </button>
              <button onClick={() => supprimeTableau(tableau)}>
                X
              </button>
            </div>
          ))}
        </div>

        <div className="nouveauTableau">
          <input
            type="text"
            value={nouveauTableau}
            onChange={(e) => setNouveauTableau(e.target.value)}
            placeholder="Nom du nouveau tableau"
          />
          <button onClick={ajouterTableau}>Créer un tableau</button>
        </div>
      </section>
    </div>
  );
}
