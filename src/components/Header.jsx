import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo  from '../../assets/logo.png'
import { AuthContext } from '../context/AuthProvider'
import Search from './Search'

const HeaderStyled = styled.div`
    font-family: 'Poppins', sans-serif;
    nav{
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .imgLogo{
        display: block;
    }
    .imgPerfil{
        display: block;
        border-radius: 1.25rem;
        object-fit: cover;
    }
    button{
        padding: .75rem;
        border-radius: 1.5rem;
        background: none;
        outline: none;
        border: none;
    }
    button:hover{
        background: #e4e4e4;
        cursor: pointer;
        transition: .2s ease-in-out;
    }
    .create{
        font-weight: 500;
        font-size: 1rem;
        font-family: 'Poppins', sans-serif;
    }
    .perfil{
        position: relative;
    }
    .icon-logout{
        position: absolute;
        color: white;
        background-color: #797979;
        padding: .25rem;
        top: 2rem;
        border-radius: 1rem;
        font-size: 1.25rem;
    }

`

function Header() {

    const navigate = useNavigate()
    const {setAuth, setToken, auth} = useContext(AuthContext)

    const onLogout = () => {
        localStorage.clear()
        setAuth({})
        setToken({})
        navigate("/login")
    }


    return (
        <HeaderStyled>
            <header>
                <nav>
                    <button onClick={()=> navigate("/feed")}><img src={logo} className="imgLogo" width="24" height="24" alt="Pinterest | Inicio" title='Pinterest | Inicio' /></button>
                    <button className='create' onClick={()=> navigate("create")} >Crear</button>
                    <Search />
                    <button className='perfil' onClick={onLogout}><img 
                            src={auth.image ? auth.image.url : 'https://res.cloudinary.com/dkzturwmj/image/upload/v1678075277/usersImage/user_default_rna1sq.jpg'} 
                            width="32" 
                            height="32" 
                            alt="Foto de perfil del usuario"
                            title='Foto de perfil del usuario'
                            className='imgPerfil' />
                            <span className="material-symbols-outlined icon-logout">logout</span>
                    </button>
                </nav>
            </header>
        </HeaderStyled>
    )
}

export default Header
