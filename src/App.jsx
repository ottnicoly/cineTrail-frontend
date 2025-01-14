// reaproveitamente de estrutura
import { Outlet } from "react-router-dom"
import Navegacao from "./components/Navegacao/Navegacao"

function App() {

  return (
    <>
      <Navegacao />
      <Outlet />
    </>
  )
}

export default App
