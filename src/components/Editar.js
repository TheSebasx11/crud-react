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
      producto: { id: 0, nombre: "", precio: 0, peso: 0, cantidad: 0 },
      ir: false,
    };
  }

  cambioValor = (e) => {
    const state = this.state.producto;
    state[e.target.name] = e.target.value;
    this.setState({ producto: state });
  };

  enviarDatos = (e) => {
    e.preventDefault();
    const { id, nombre,precio, peso, cantidad  } = this.state.producto;
    var datosEnviar = { id: id, nombre: nombre, precio: precio, peso:peso, cantidad:cantidad };
    fetch("http://localhost/productos/?actualizar=1", {
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
    fetch("http://localhost/productos/?consultar=" + this.props.match.params.id)
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log(datosRespuesta[0]);
        this.setState({ datosCargados: true, producto: datosRespuesta[0] });
      })
      .catch(console.log);
  }

  render() {
    const { producto, ir } = this.state;
    return (
      <div className="card">
        {ir && <Navigate to="/" replace={true} />}
        <div className="card-header">Editar producto</div>
        <div className="card-body">
          <div className="form-group">
            <label>Clave:</label>

            <input
              type="text"
              name="nombre"
              readOnly
              value={producto.id}
              id="nombre"
              className="form-control"
              placeholder=""
              aria-describedby="helpId"
            />

            <small id="helpId" className="text-muted">
              Clave del producto
            </small>
          </div>
          <form onSubmit={this.enviarDatos}>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                required
                onChange={this.cambioValor}
                value={producto.nombre}
                id="nombre"
                className="form-control"
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="text-muted">
                Escribe el nombre del producto
              </small>
            </div>
            <div className="form-group">
              <label>Precio:</label>
              <input
                type="number"
                name="precio"
                required
                onChange={this.cambioValor}
                value={producto.precio}
                className="form-control"
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="text-muted">
                Escribe el precio del producto
              </small>
            </div>
            <div className="form-group">
              <label>Peso:</label>
              <input
                type="number"
                name="peso"
                required
                onChange={this.cambioValor}
                value={producto.peso}
                className="form-control"
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="text-muted">
                Escribe el Peso del producto
              </small>
            </div>
            <div className="form-group">
              <label>Cantidad:</label>
              <input
                type="number"
                name="cantidad"
                required
                onChange={this.cambioValor}
                value={producto.cantidad}
                className="form-control"
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="text-muted">
                Escribe la cantidad del producto
              </small>
            </div>
            <div className="btn-group" role="group" aria-label="">
              <button type="submit" className="btn btn-success">
                Actualizar producto
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
