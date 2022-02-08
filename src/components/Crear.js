import React from "react";
import { Link, Navigate} from "react-router-dom";

class Crear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      correo: "",
      ir: false,
    };
  }

  enviarDatos = (e) => {
    e.preventDefault();
    const { nombre, correo } = this.state;
    var datosEnviar = { nombre: nombre, correo: correo };
    fetch("http://localhost/empleados/?insertar=1", {
      method: "POST",
      body: JSON.stringify(datosEnviar),
    })
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log(datosRespuesta);
        this.setState({ir:true});

      })
      .catch(console.log);
  };

  cambioValor = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state });
  };

  render() {
    const { nombre, correo, ir } = this.state;

    return (
        
      <div className="card">
        {ir && (<Navigate to="/" replace={true}/>)}
        <div className="card-header">
          <h4>Crear Empleados</h4>
        </div>
        <div className="card-body">
          <form onSubmit={this.enviarDatos}>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                onChange={this.cambioValor}
                value={nombre}
                id="nombre"
                className="form-control"
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="text-muted">
                Escribe el nombre del empleado
              </small>
            </div>
            <div className="form-group">
              <label>Correo:</label>
              <input
                type="text"
                name="correo"
                id="nombre"
                onChange={this.cambioValor}
                value={correo}
                className="form-control"
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="text-muted">
                Escribe el Correo del empleado
              </small>
            </div>

            <div className="btn-group" role="group" aria-label="">
              <button type="submit" className="btn btn-success">
                Agregar nuevo empleado
              </button>
              <Link to={"/"} className="btn btn-cancel">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
        <div className="card-footer text-muted">Footer</div>
      </div>
    );
  }
}

export default Crear;
