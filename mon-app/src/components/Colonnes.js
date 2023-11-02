import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cartes from '/Users/miaherbillon/Desktop/Eurydice/mon-app/src/components/CreateCarte.js';

export default function Colonne({ select, data, setData, setSelect }) {
  const [nouveauName, setNouveauName] = useState('');
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/${select}`);
        setData(response.data);
  
      } catch (error) {
        console.error('Une erreur s\'est produite pendant la requête HTTP :', error);
      }
    };
    fetchData();
      setLoading(true)
  }, [select, setData, data]);

  const ajouterColonne = async () => {
    try {
      const response = await axios.put(`http://localhost:3010/modifier/${select}`, {
        colonnes: {
          name: nouveauName,
          notes: []
        }
      });
      const nouvelleColonne = response.data;

      if (nouvelleColonne) {
        setData([...data, nouvelleColonne]);
        setNouveauName('');
      }
    } catch (error) {
      console.error('Erreur lors de la création de la colonne', error);
    }
    setNouveauName('');
  };

  const supprimerColonne = async (colonneId) => {
    try {
      const response = await axios.delete(`http://localhost:3010/supprimerColonne`, {
        data: {
          id: select,
          colonneId: colonneId
        }
      });
      setData(response.data.updatedTableau);
    } catch (error) {
      console.error('Erreur lors de la suppression de la colonne', error);
    }
  };

  return ( loading &&  <section className="Colonne">
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
      <div className="containerColonne">
      {data && data.colonnes && data.colonnes.length > 0 ? (
  data.colonnes.map((elem, index) => {
console.log(" ici le elem", elem)
return <div key={index}>
      <h3>{elem.name}</h3>
      <Cartes select={select} indexElem={elem._id} />
      <button onClick={() => supprimerColonne(elem._id)} className="buttonDelete">
        Supprimer cette colonne
      </button>
    </div>
 } )
) : (
  <p>Aucune colonne</p>
)}


      </div>
    </section>
  );
}
