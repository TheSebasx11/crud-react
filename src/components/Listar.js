import React from "react";
import {Link} from "react-router-dom";

class Listar extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td >1</td>
              <td>Sebas</td>
              <td>s@gmail.com</td>
              <td>
                <div class="btn-group" role="group" aria-label="">
                  <Link to={"/editar"} class="btn btn-primary">Editar</Link>
                  <button type="button" class="btn btn-danger">Borrar</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Revoltoso</td>
              <td>Diosito ayudanos por favor</td>
              <td>
                <div class="btn-group" role="group" aria-label="">
                  <Link to={"/editar"} class="btn btn-primary">Editar</Link>
                  <button type="button" class="btn btn-danger">Borrar</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Dios Mio</td>
              <td>Diosito ayudanos por favor</td>
              <td>
                <div class="btn-group" role="group" aria-label="">
                  <Link to={"/editar"} class="btn btn-primary">Editar</Link>
                  <button type="button" class="btn btn-danger">Borrar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
    );
  }
}

export default Listar;
