// reaproveitamente de estrutura
import { Outlet } from "react-router-dom"
import Navegacao from "./components/Navegacao/Navegacao"

function App() {

  return (
    <>
      <Navegacao />
      <Outlet />
      <h1>footer</h1>
    </>
  )
}

export default App
