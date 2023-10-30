import './App.css';
import Liste from "./components/liste.js"
import Cartes from "./components/cartes.js"

export default function App() {
  return (
    <section>
      <h1>Titre</h1>
      <div>
         <Liste />
         <Cartes/>
      </div>
     
    </section>
  );
}
