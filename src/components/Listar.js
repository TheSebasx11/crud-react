import React from "react";

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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">1</td>
              <td>Sebas</td>
              <td>s@gmail.com</td>
            </tr>
            <tr>
              <td scope="row">2</td>
              <td>Revoltoso</td>
              <td>Diosito ayudanos por favor</td>
            </tr>
            <tr>
              <td scope="row">3</td>
              <td>Dios Mio</td>
              <td>Diosito ayudanos por favor</td>
            </tr>
          </tbody>
        </table>
    );
  }
}

export default Listar;
