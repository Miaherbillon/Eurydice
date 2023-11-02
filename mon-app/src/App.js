import './App.css';
import './css/Liste.css'
import './css/Carte.css'
import './css/Colonne.css'
import Liste from "./components/Liste.js"
import Colonne from "./components/Colonnes.js"
import axios from 'axios';
import React, { useEffect, useState } from 'react';


function App() {
     const [data, setData] = useState([]);
    const[select,setSelect]=useState()

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
    }, []);
  return (
    <>
      <div className="container">
        <Liste select={select} setSelect={setSelect} />
         <Colonne data={data} setData={setData} select={select} setSelect={setSelect}/>
      </div>
    
    </> 
  );
}

export default App;
