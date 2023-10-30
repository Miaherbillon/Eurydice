import './App.css';
import Liste from "./components/liste.js";
import Cartes from "./components/cartes.js";

export default function App() {
  return (
    <section>
      <h1 class=" text-yellow-300 ">Titre</h1>
      <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
      <div>
        <Liste />
        <Cartes />
      </div>
    </section>
  );
}
