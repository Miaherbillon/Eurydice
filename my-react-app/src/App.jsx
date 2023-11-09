import React, { useEffect } from 'react';
import axios from 'axios';
import Liste from "./components/Liste.jsx";
import Colonnes from "./components/Colonnes.jsx";
import { useTodoProvider } from "./Context.jsx";

function App() {
  const [ context, dispatch] = useTodoProvider();

// console.log("app", context)
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


  // console.log("context", context);

  return (
    <div className="container">
      {context && context.selectedTab && context.listTab ? (
        <Liste select={context.selectedTab._id} tableaux={context.listTab} />
      ) : (
        <p>Loading...</p>
      )}
{context &&
  context.listTab &&
  context.listTab.length > 0 &&
  context.listTab.map((tableau) => {
    // console.log("tab", tableau);
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

export default App;
