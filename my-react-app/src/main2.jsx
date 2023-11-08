import App from "./App"
import { TodoProvider } from "./Context.jsx";


export default function  main () {
    return  <TodoProvider>
             <App/>
             </TodoProvider>
    
}