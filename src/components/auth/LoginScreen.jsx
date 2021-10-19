import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import useForm from '../../hooks/useForm';

const LoginScreen = () => {

    const dispatch = useDispatch()

    const [ formLogin, handleLoginInputChange ] = useForm({
        logEmail: '',
        logPassword: ''
    })
    const { logEmail, logPassword } = formLogin
    
    const [ formRegister, handleRegisterInputChange ] = useForm({
        regName: '',
        regEmail: '',
        regPassword: '',
        regPassword2: ''
    })
    const { regName, regEmail, regPassword, regPassword2 } = formRegister

    const handleLogin = e => {
        e.preventDefault()
        dispatch(startLogin( logEmail, logPassword ))
    }

    const handleRegister = e => {
        e.preventDefault()

        if( regPassword !== regPassword2 ) {
            return Swal.fire('Error', 'Passwords Should Match', 'error')
        }

        dispatch(startRegister( regEmail, regPassword, regName ))
    }

    return (

        <div className="container login__container">
            <h1 style={{textAlign: 'center'}}>GRUPO 11 - Calendario Para ecommerce DH</h1>
            <p style={{textAlign: 'center'}}>Alejo Bonadeo, Eduardo Di Fermo, Felipe Englebienne, Javier Menendez</p>
            <div className="row">
                <div className="col-md-6 login__form-1">
                    <h3>Log In</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="logEmail"
                                value={ logEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="logPassword"
                                value={ logPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="login__btnSubmit"
                                value="Log In" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login__form-2">
                    <h3>Register</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="regName"
                                value={ regName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="regEmail"
                                value={ regEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password" 
                                name="regPassword"
                                value={ regPassword }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat Password" 
                                name="regPassword2"
                                value={ regPassword2 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="login__btnSubmit" 
                                value="Create Account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen