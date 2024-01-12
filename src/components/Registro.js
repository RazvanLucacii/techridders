import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';


export default class Registro extends Component {
    cajaNombre = React.createRef();
    cajaEmail = React.createRef();
    cajaRoles = React.createRef();
    cajaTelefono = React.createRef();
    cajaLinkedin = React.createRef();
    cajaPassword = React.createRef();
    cajaRepPassword = React.createRef();
    cajaApellidos = React.createRef();

    state = {
        usuario: {},
        Role: []
    }


    registro = (e) => {
        e.preventDefault();
        var nombre = this.cajaNombre.current.value;
        var email = this.cajaEmail.current.value;
        var telefono = this.cajaTelefono.current.value;
        var linkedin = this.cajaLinkedin.current.value;
        var password = this.cajaPassword.current.value;

        var datos = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            linkedin: linkedin,
            password: password,
        }

        const request = 'api/usuarios';
        const url = Global.urlApi + request;
        axios.post(url, datos).then(response => {
            this.setState({
                usuario: response.data
            })
        })
    }

    getRoles = () => {
        const request = 'api/roles';
        const url = Global.urlApi + request;
        axios.get(url).then(response =>{
            this.setState({
                Role: response.data
            })
        })
    }

    componentDidMount = () => {
        this.getRoles()
    }

    render() {
        return (
            <div className='card'>
                <div class="card-body">
                    <h2 className='card-title'>Registro</h2>
                    <form>
                        <br />
                        <label>Roles:</label>
                        <select name="rol" ref={this.cajaRoles} class="form-control">
                            {           
                                this.state.Role.map((Role, index) =>{
                                    return(<option key={index} value={Role.idRole}>
                                        {Role.tipoRole}
                                    </option>)
                                })     
                            }
                        </select>
                        <br/>
                        <label>Nombre:</label>
                        <input type="text" name="nombre" ref={this.cajaNombre} class="form-control" />
                        <label>Apellidos:</label>
                        <input type="text" name="apellidos" ref={this.cajaApellidos} class="form-control" />
                        <br />
                        <label>Email:</label>
                        <input type="email" name="email" ref={this.cajaEmail} class="form-control"/>
                        <br />
                        <label>Telefono:</label>
                        <input type="text" name="telefono" ref={this.cajaTelefono} class="form-control"/>
                        <br />
                        <label>Linkedin:</label>
                        <input type="text" name="linkedin" ref={this.cajaLinkedin} class="form-control"/>
                        <br />
                        <label>Contraseña:</label>
                        <input type="password" name="pass" ref={this.cajaPassword} class="form-control"/>
                        <br />
                        <label>Repetir Contraseña:</label>
                        <input type="password" name="reppass" ref={this.cajaRepPassword} class="form-control" />
                    
                        <button className='btn btn-info' type="submit" onClick={this.registro}>Registrarse</button>
                    </form>
                </div>
            </div>
        );
    }
}
