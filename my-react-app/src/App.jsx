import Home from "./Home.jsx"
import { TodoProvider } from "./Util/Context.jsx";


export default function App() {
    return <TodoProvider>
        <Home />
    </TodoProvider>

}