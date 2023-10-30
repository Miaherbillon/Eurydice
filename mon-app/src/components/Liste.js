import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Liste({ select, setSelect }) {
  const [data, setData] = useState([]);
  const [cartes, setCartes] = useState([]);
  const [nouveauTableau, setNouveauTableau] = useState('');
  const [tableauActif, setTableauActif] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3010/');
        setData(response.data);
        setCartes(response.data);
      } catch (error) {
        console.error("Erreur", error);
      }
    };
    fetchData();
  }, [nouveauTableau]); 

  const supprimerCarte = (id) => {
    const newCartes = cartes.filter((carte) => carte._id !== id);
    setCartes(newCartes);
  };

  const ajouterTableau = async () => {
    try {
      const response = await axios.post('http://localhost:3010/create', { name: nouveauTableau });
      setCartes([...cartes, response.data]);
      setNouveauTableau('');
    } catch (error) {
      console.error("Erreur lors de la création du tableau", error);
    }
  };

  const afficherMessage = (elem) => {
    setSelect(elem._id);
    console.log(`Le tableau sélectionné est : ${elem.name}`);
    setTableauActif(elem.name);
  };


const supprimeTableau = async (elem) => {
    
  try {
    console.log("ID de l'élément à supprimer :", elem._id); 
    const response = await axios.delete(`http://localhost:3010/supprimer/${elem._id}` );
    console.log("Réponse du serveur :", response); 
    const updatedCartes = cartes.filter((carte) => carte._id !== elem._id);
    setCartes(updatedCartes);
  } catch (error) {
    console.error("Erreur lors de la suppression du tableau", error);
  }
};

//Crée les tableaux dans la liste, supprimer, et lier le contenue dans "mes notes"


  return (
    <div>
      <section className="Liste">
        <h2>Mes listes de tableaux :</h2>
        <div className="ListeCarteMap">
          {data.map((elem, index) => (
            <div key={elem._id}>
              <button
                className="buttonName"
                onClick={() => afficherMessage(elem)}
              >
                {elem.name}
              </button>
              <button
                className="buttonSupprimer"
                onClick={() => supprimeTableau(elem)}
              >
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



