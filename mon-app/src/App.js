import './App.css';
import './css/Liste.css'
import './css/Cartes.css'
import Liste from "./components/Liste.js"
import Cartes from "./components/Cartes.js"
import axios from 'axios';
import React, { useEffect, useState } from 'react';


function App() {
     const [data, setData] = useState([]);
    const [cartes, setCartes] = useState([]);

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
    }, []);
  return (
    <section>
      <h1>?</h1>  
      <div className="container">
        <Liste  />
         <Cartes data={data} setData={setData}/>
      </div>
    
    </section> 
  );
}

export default App;
