import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import { AuthContext } from '../context/AuthProvider'
import svgLoading from '../../assets/loading.svg'

const PrivateLayoutStyled = styled.section`

`

function PrivateLayout() {

    const {auth, loading} = useContext(AuthContext)

    if(loading){
        <div className="divLoading">
            <img src={svgLoading} alt="Cargando..." title='Cargando...' />
        </div>        
    } else {
        return (
            <PrivateLayoutStyled>
                <Header />
                {
                    auth._id ? <Outlet /> : <Navigate to="/login" />
                }
            </PrivateLayoutStyled>
        )
    }
}

export default PrivateLayout
