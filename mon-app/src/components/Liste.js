import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Liste() {
    const [data, setData] = useState([]);
    const [cartes, setCarte] = useState([]);
    const [nouveauTableau, setNouveauTableau] = useState('');
    const [tableauActif, setTableauActif] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3010/');
                setData(response.data);
            } catch (error) {
                console.error("Erreur", error);
            }
        };
        fetchData();
    }, [data]);

    console.log(data);

    const supprimerCarte = (index) => {
        const newCartes = [...cartes];
        newCartes.splice(index, 1);
        setCarte(newCartes);
    };

    const ajouterTableau = async () => {
        try {
            await axios.post('http://localhost:3010/create', { name: nouveauTableau });
            setCarte([...cartes, nouveauTableau]);
            setNouveauTableau('');
        } catch (error) {
            console.error("Erreur lors de la création du tableau", error);
        }
    };

    const afficherMessage = (elem) => {
        console.log(`Le tableau sélectionné est : ${elem}`);
        setTableauActif(elem);
    };

      const supprimeTableau = async (elem) => {
    try {
        await axios.post(`http://localhost:3010/delete/${elem._id}`, { name: nouveauTableau });
        setCarte([...cartes, nouveauTableau]);
        setNouveauTableau('');
    } catch (error) {
        console.error("Erreur lors de la création du tableau", error);
    }
};




// console.log(data[0])
    return (
        <div>
            <section className="Liste">
                <p>Je suis dans Liste</p>
                <div className="ListeCarteMap">
                    {data.map((elem, index) => {
                        // console.log(elem)
                        return (
                            <div key={index}>
                                <button
                                    onClick={() => {
                                        afficherMessage(elem);
                                    }}
                                >
                                    {elem.name}
                                </button>
                                <button
                                    onClick={() => {
                                        supprimerCarte(index);
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        );
                    })}
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
