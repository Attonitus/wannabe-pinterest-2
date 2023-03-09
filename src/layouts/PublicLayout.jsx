import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../context/AuthProvider'
import svgLoading from '../../assets/loading.svg'

const PublicLayoutStyled = styled.section`

`

function PublicLayout() {
    const {auth, loading} = useContext(AuthContext)
    if(loading){
        <div className="divLoading">
            <img src={svgLoading} alt="Cargando..." title='Cargando...' />
        </div>
    } else {
        return (
            <PublicLayoutStyled>
                {
                    !auth._id ? <Outlet /> : <Navigate to="/feed" />
                }
            </PublicLayoutStyled>
        )
    }
}

export default PublicLayout
