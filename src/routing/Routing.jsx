import styled from 'styled-components'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import Login from '../layouts/pages/Login'
import PrivateLayout from '../layouts/PrivateLayout'
import App from '../App'
import PostPage from '../layouts/pages/PostPage'
import Register from '../layouts/pages/Register'
import CreatePin from '../layouts/pages/CreatePin'
import AuthProvider from '../context/AuthProvider'
import SearchPage from '../layouts/pages/SearchPage'

const RoutingStyled = styled.div`

`

function Routing() {
    return (
        <RoutingStyled>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path='/' element={ <PublicLayout /> }> 
                            <Route index element={<Login />} />                    
                            <Route path='login' element={<Login />} />
                            <Route path='registro' element={<Register />} />
                        </Route>

                        <Route path='/feed' element={<PrivateLayout />}>
                            <Route index element={ <App /> } />
                            <Route path='post/:id' element={<PostPage />} />
                            <Route path='create' element={<CreatePin />} />
                            <Route path='search/:search' element={<SearchPage />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </RoutingStyled>
    )
}

export default Routing
