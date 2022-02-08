import React from "react";
import { useParams } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

class Editar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      empleado: { id: 0, nombre: "", correo: "" },
      ir: false,
    };
  }

  cambioValor = (e) => {
    const state = this.state.empleado;
    state[e.target.name] = e.target.value;
    this.setState({ empleado: state });
  };

  enviarDatos = (e) => {
    e.preventDefault();
    const { id, nombre, correo } = this.state.empleado;
    var datosEnviar = { id: id, nombre: nombre, correo: correo };
    fetch("http://localhost/empleados/?actualizar=1", {
      method: "POST",
      body: JSON.stringify(datosEnviar),
    })
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log(datosRespuesta);
        this.setState({ ir: true });
      })
      .catch(console.log);
  };

  componentDidMount() {
    fetch("http://localhost/empleados/?consultar=" + this.props.match.params.id)
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log(datosRespuesta[0]);
        this.setState({ datosCargados: true, empleado: datosRespuesta[0] });
      })
      .catch(console.log);
  }

  render() {
    const { empleado, ir } = this.state;
    return (
      <div className="card">
        {ir && <Navigate to="/" replace={true} />}
        <div className="card-header">Editar Empleado</div>
        <div className="card-body">
          <div className="form-group">
            <label>Clave:</label>

            <input
              type="text"
              name="nombre"
              readOnly
              value={empleado.id}
              id="nombre"
              className="form-control"
              placeholder=""
              aria-describedby="helpId"
            />

            <small id="helpId" className="text-muted">
              Clave del empleado
            </small>
          </div>
          <form onSubmit={this.enviarDatos}>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                onChange={this.cambioValor}
                value={empleado.nombre}
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
                value={empleado.correo}
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
                Actualizar empleado
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

export default withRouter(Editar);

//export default Editar;
