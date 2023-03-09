import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../../assets/logo.png'
import { GlobalUrl } from '../../helpers/GlobalUrl'
import { useForm } from '../../hooks/useForm'
import iconLoading from '../../../assets/loading.svg'

const RegisterStyled = styled.div`
    display: flex;
    justify-content: center;
    margin-block-start: 1rem;
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
        margin-block-start: 1rem;
        margin-block-end: 0;
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
    h5{
        margin: 0;
        margin-block: 1rem;
        font-weight: 400;
        color: #151515;
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
    .imageIcon{
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        border: none;
        text-align: center;
        background-color: #dedede;
        padding: 1rem;
        cursor: pointer;
        .imgText{
            font-size: 2rem;
        }
    }
    .file{
        display: none;
    }
    .close{
        position: absolute;
        right: 1rem;
        top: .5rem;
        cursor: pointer;
        background-color: white;
        border-radius: 1rem;
    }
    .previewImage{
        position: relative;
    }
    .previewImage img{
        inline-size: 100%;
        max-block-size: 15rem;
        object-fit: cover;
        border-radius: 1rem;
    }
    .smallText{
        font-size: .9rem;
    }

`

function Register() {

    const [imagePrev, setImagePrev] = useState(null)
    const imageRef = useRef()
    const navigate = useNavigate()

    const {form, onInputChange} = useForm({
        email: '',
        password: '',
        username: ''
    })

    const {email, password, username} = form
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const onImageChange = (e) => {
        const {target} = e
        if(target.files && target.files[0]){
            let img = target.files[0]
            setImagePrev({
                image: URL.createObjectURL(img)
            })
        }
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {

            if(!email || !(email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))){
                console.log("email no pasa")
                setLoading(false)
                return setError('Ingrese un email válido')
            }

            if(password.length < 6){
                console.log("password no pasa")
                setLoading(false)
                return setError('La contraseña debe ser mayor a 6 caracteres')
            }

            if(!username){
                console.log("username no pasa")
                setLoading(false)
                return setError('Ingrese un usuario')
            }
            
            const image = imageRef.current
            const data = new FormData()

            if(image.files[0]){
                data.append("image", image.files[0])
            }

            data.append("username", username)
            data.append("password", password)
            data.append("email", email)

            const response = await fetch(`${GlobalUrl.url}/users/register`, {
                method: "POST",
                body: data
            })

            await response.json()
            setLoading(false)
            navigate("/login")

        } catch (error) {
            console.log(error)
            setLoading(false)
            return setError("Hubo un error")
        }
    }

    return (
        <RegisterStyled>
            <div className="page">
                <div className="titles">
                    <img src={logo} height="32" width="32" alt="" />
                    <h3 className='title-text'>Bienvenido a Wannabe Pinterest 2.0</h3>
                    <h5>Encuentra nuevas ideas para probar</h5>
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
                    <div className="inputDiv">
                        <label htmlFor="username">Usuario</label>
                        <input type="text" name="username" placeholder='Usuario' id="username" value={username} onChange={onInputChange} />
                    </div>
                    <div className="inputDiv">
                        <label htmlFor="image">Imagen de perfil</label>
                        <div className={`imageIcon ${imagePrev ? 'file' : ''}`} onClick={()=> imageRef.current.click()}>
                            <span className="material-symbols-outlined imgText">image</span>
                            <span className='smallText'>Seleccione una imagen</span>
                        </div>
                    </div>
                    <div className="inputDiv file">
                        <label htmlFor="image">Imagen de perfil</label>
                        <input type="file" name="image" id="image" ref={imageRef} onChange={onImageChange} />
                    </div>
                    {
                        !imagePrev ? null :
                        <div className="previewImage">
                            <span className="material-symbols-outlined close" onClick={()=>setImagePrev(null)}>close</span>
                            <img src={imagePrev.image} alt="" />
                        </div>
                    }
                    {
                        !error ? null :
                        <div className="divError">
                            {error}
                        </div>
                    }
                    {
                        !loading ? null :
                        <div className="divLoading">
                            <img src={iconLoading} height="50" width="50" alt="Cargando..." title='Cargando...'/>
                        </div>
                    }

                    <button type="submit" className="red-button">Registrarme</button>
                    <Link to="/login"  className='link' >¿Ya eres miembro? Inicia sesión</Link>
                </form>
            </div>
        </RegisterStyled>
    )
}

export default Register
