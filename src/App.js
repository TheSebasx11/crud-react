import "./App.css";
import Listar from "./components/Listar";
import Crear from "./components/Crear";
import Editar from "./components/Editar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="nav navbar-nav">
            <a className="nav-item nav-link active" href="/">
              Listar 
            </a>
            <a className="nav-item nav-link" href="/crear">
              Crear
            </a>
            <a className="nav-item nav-link" href="/editar">
              Editar
            </a>
          </div>
        </nav>
       <Routes>
          <Route path="/" element={<Listar></Listar>}></Route>
          <Route path="/crear" element={<Crear></Crear>}></Route>
          <Route path="/editar" element={<Editar></Editar>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
