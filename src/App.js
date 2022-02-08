import "./App.css";
import Listar from "./components/Listar";
import Crear from "./components/Crear";
import Editar from "./components/Editar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {Link} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="nav navbar-nav">
            <Link className="nav-item nav-link active" to={"/"}>
              Listar 
            </Link>
            <Link className="nav-item nav-link" to={"/crear"}>
              Crear
            </Link>
          </div>
        </nav>
       <Routes>
          <Route path="/" element={<Listar></Listar>}></Route>
          <Route path="/crear" element={<Crear></Crear>}></Route>
          <Route path="/editar/:id" element={<Editar></Editar>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
