import Home from "./Home.jsx"
import { TodoProvider } from "./Util/Context.jsx";


export default function  main () {
    return  <TodoProvider>
             <Home/>
             </TodoProvider>
    
}