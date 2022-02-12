import React from "react";
import { Link, Navigate} from "react-router-dom";

class Crear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      precio: 0,
      peso: 0,
      cantidad: 0,
      errores: [],
      ir: false,
    };
  }

verificarError(elemento) {
  return this.state.errores.indexOf(elemento) !== -1;
}

  enviarDatos = (e) => {
    e.preventDefault();
    const { nombre, precio, peso, cantidad } = this.state;

    var errores = [];
    if(!nombre)errores.push("error_nombre");
    if(!precio)errores.push("error_precio");
    if(!peso)errores.push("error_peso");
    if(!cantidad)errores.push("error_cantidad");

    this.setState({errores:errores});
    if(errores.length>0)return false;

    var datosEnviar = { nombre: nombre, precio: precio, peso:peso, cantidad:cantidad };
    fetch("http://localhost/productos/?insertar=1", {
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
    this.setState({ state, errores:[] });
  };

  render() {
    const { nombre, precio, peso, cantidad, ir } = this.state;

    return (
        
      <div className="card">
        {ir && (<Navigate to="/" replace={true}/>)}
        <div className="card-header">
          <h4>Crear productos</h4>
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
                className={((this.verificarError("error_nombre"))?"is-invalid ":"") + "form-control"}
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Escribe el nombre del empleado
              </small>
            </div>
            <div className="form-group">
              <label>Precio:</label>
              <input
                type="number"
                name="precio"
                id="nombre"
                onChange={this.cambioValor}
                value={precio}
                className={((this.verificarError("error_precio"))?"is-invalid ":"") + "form-control"}
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Escribe el precio del empleado
              </small>
            </div>
            <div className="form-group">
              <label>Peso:</label>
              <input
                type="number"
                name="peso"
                onChange={this.cambioValor}
                value={peso}
                className={((this.verificarError("error_peso"))?"is-invalid ":"") + "form-control"}
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Escribe el peso del producto
              </small>
            </div>
            <div className="form-group">
              <label>Cantidad:</label>
              <input
                type="number"
                name="cantidad"
                onChange={this.cambioValor}
                value={cantidad}
                className={((this.verificarError("error_cantidad"))?"is-invalid ":"") + "form-control"}
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Escribe la cantidad del producto
              </small>
            </div>
            <br/>
            <div className="btn-group" role="group" aria-label="">
              <button type="submit" className="btn btn-success">
                Agregar nuevo producto
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
