import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../../assets/logo.png'
import { useForm } from '../../hooks/useForm'
import svgLoading from '../../../assets/loading.svg'
import { GlobalUrl } from '../../helpers/GlobalUrl'
import { AuthContext } from '../../context/AuthProvider'

const LoginStyled = styled.div`
    display: flex;
    justify-content: center;
    block-size: 100vh;
    align-items: center;

    .page{
        max-inline-size: 20rem;

        padding: 2rem;
        border-radius: 1.5rem;
        box-shadow: 1px 1px 20px 7px rgba(0,0,0,0.34);
        -webkit-box-shadow: 1px 1px 20px 7px rgba(0,0,0,0.34);
        -moz-box-shadow: 1px 1px 20px 7px rgba(0,0,0,0.34);
    }
    .titles{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .title-text{
        font-weight: 500;
        font-size: 1.5rem;
        text-align: center;
        margin-block: 1rem;
    }
    .red-button{
        padding-block: .5rem;
        padding-inline: 1.5rem;
        background-color: #E60023;
        color: white;
        font-weight: 500;
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        border: 1px solid #E60023;
        border-radius: 1.5rem;
    }
    .red-button:hover{
        background-color: white;
        color: #E60023;
        cursor: pointer;
        transition: .2s ease-in-out;
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 1rem;

    }
    .inputDiv{
        display: flex;
        flex-direction: column;
        gap: .15rem;
    }
    label{
        font-size: .9rem;
        font-weight: 300;
        margin-inline-start: .5rem;
    }
    input{
        padding-block: .75rem;
        padding-inline: 1rem;
        font-size: 1rem;
        border-radius: 1rem;
        border: none;
        outline: none;
        border: .1rem solid #cdcdcd;
    }

    input:focus{
        outline: .25rem solid;
        border-color: #68baf9;
        outline-color: #68baf9;
        transition: .1s ease-in-out;
    }
    .link{
        color: black;
        text-decoration: none;
        text-align: center;
        font-size: .8rem;
        font-weight: 600;
    }
`

function Login() {

    const {form, onInputChange} = useForm({
        email: '',
        password: ''
    })

    const {setAuth} = useContext(AuthContext)

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const {email, password} = form

    const onSubmit = async(e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        if(!email || !(email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))){
            setLoading(false)
            return setError('Ingrese un email válido')
        }

        if(password.length < 6){
            setLoading(false)
            return setError('La contraseña debe ser mayor a 6 caracteres')
        }
        
        try {

            const data = new FormData()
            data.append("email", email)
            data.append("password", password)

            const response = await fetch(`${GlobalUrl.url}/users/login`, {
                method: 'POST',
                body: data
            })
            const json = await response.json()
            if(json.error){
                setLoading(false)
                return setError(json.error)
            }
            
            localStorage.setItem("user", JSON.stringify(json.user))
            localStorage.setItem("token", json.token)

            setLoading(false)
            setAuth(json.user)
            window.location.reload()
        } catch (error) {
            setLoading(false)
            setError('Hubo un error')
        }

    }

    return (
        <LoginStyled>
            <div className="page">
                <div className="titles">
                    <img src={logo} height="32" width="32" alt="" />
                    <h3 className='title-text'>Bienvenido a Wannabe Pinterest 2.0</h3>
                </div>
                <form onSubmit={onSubmit} >
                    <div className="inputDiv">
                        <label htmlFor="email">Correo</label>
                        <input type="email" placeholder='Correo' id='email' name='email' value={email} onChange={onInputChange} />
                    </div>
                    <div className="inputDiv">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" placeholder='Contraseña' id="password" value={password} onChange={onInputChange} />
                    </div>
                    {
                        !error ? null :
                        <div className="divError">
                            {error}
                        </div>
                    }
                    {
                        !loading ? null : 
                        <div className="divLoading">
                            <img src={svgLoading} alt="Cargando..."  height="50" width="50" title='Cargando...' />
                        </div>
                    }
                    <button type="submit" className='red-button'>Iniciar sesión</button>
                    <Link to="/registro"  className='link' >¿Aún no estás en Wannabe Pinterest? Regístrate</Link>
                </form>
            </div>
        </LoginStyled>
    )
}

export default Login
