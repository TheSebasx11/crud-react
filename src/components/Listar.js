import React from "react";
import { Link } from "react-router-dom";

class Listar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { datosCargados: false, productos: [] };
  }

  //  El metodo para borrar registros
  borrarRegistro(id) {
    fetch("http://localhost/productos/?borrar=" + id)
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log(datosRespuesta);
        this.cargarDatos();
      }).catch(console.log);
  }

  //metodo para cargar todos los datos de la API
  cargarDatos() {
    fetch("http://localhost/productos/")
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        this.setState({ datosCargados: true, productos: datosRespuesta });
      })
      .catch(console.log);
  }

  //Metodo propio para indicar que se ejecuta cuando se carga la vista 
  componentDidMount() {
    this.cargarDatos();
  }

  render() {
    const { datosCargados, productos } = this.state;
    if (!datosCargados) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div className="card">
          <div className="card-header">
            <Link to={"/crear"} className="btn btn-success">
              Agregar nuevo producto
            </Link>
          </div>
          <div className="card-body">
            <h4>Lista de productos</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Peso</th>
                  <th>Cantidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {/*Se crea de forma dinamica las filas de la tabla con respecto a la informacion que devuelve la Api */}
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.peso}</td>
                    <td>{producto.cantidad}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="">
                        <Link to={"/editar/"+producto.id} className="btn btn-warning">
                          Editar
                        </Link>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => this.borrarRegistro(producto.id)}
                        >
                          Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer text-muted">Created by Sebastian & Roosevelt</div>
        </div>
      );
    }
  }
}

export default Listar;
