import { createContext, useEffect, useState } from "react"
import { GlobalUrl } from "../helpers/GlobalUrl"

export const AuthContext = createContext()

function AuthProvider({children}) {

    const [auth, setAuth] = useState({})
    const [token, setToken] = useState()
    const [loading, setLoading] = useState(true)

    const authUser = async() => {
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")

        if(!token || !user){
            setLoading(false)
            return false
        }

        const userObj = JSON.parse(user)
        const userId = userObj._id
        const response = await fetch(`${GlobalUrl.url}/users/${userId}`, {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : token
            }
        })

        const data = await response.json()
        setToken(token)
        setAuth(data)
        setLoading(false)
    }

    useEffect(()=> {
        authUser()
    },[])

    return (
        <AuthContext.Provider value={{
            auth,
            token,
            setAuth,
            setToken,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
