import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Liste from "./components/listTableaux.jsx";
import Colonnes from "./components/Colonnes.jsx";
import { useTodoProvider } from "./Util/Context.jsx";
// ...................................................
import "./css/Liste.css"
import "./css/Colonnes.css"
// ...................................................

function Home() {
  const [context, dispatch] = useTodoProvider();
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3010/');
        dispatch({ type: "setlistTab", payload: response.data });
      } catch (error) {
        console.error("Erreur", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="container">
      {context && context.selectedTab && context.listTab ? (
        <Liste select={context.selectedTab._id} tableaux={context.listTab} setLoading={setLoading} />
      ) : (
        <p>Loading...</p>
      )}
      {context &&
        context.listTab &&
        context.listTab.length > 0 &&
        context.listTab.map((tableau) => {


          if (context.selectedTab && tableau._id === context.selectedTab) {
            return (
              <div key={tableau._id}>
                <Colonnes colonnes={context.listColonnes} id={context.selectedTab} />
              </div>
            );
          }
          return null;
        })}

    </div>
  );
}

export default Home;
