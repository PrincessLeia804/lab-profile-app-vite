import axios from "axios"
import { createContext, useEffect, useState } from "react"
const AuthContext = createContext()


function AuthContextWrapper({children}) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    const authenticateUser = async() => {
        const tokenInStorage = localStorage.getItem("authToken")
        console.log('tokenInStorage: ', tokenInStorage);

        if(tokenInStorage){
            try {
                const {data} = await axios.get("http://localhost:5005/auth/verify", {
                    headers: {authorization : `Bearer ${tokenInStorage}`}
                })
                console.log('response from verify data: ', data);
                setUser(data.currentUser)
                setIsLoading(false)
                setIsLoggedIn(true)
                
            } catch (error) {
                console.log("authentication failed: ", error);
                setUser(null)
                setIsLoading(false)
                setIsLoggedIn(false)
            }
        } else {
            setUser(null)
            setIsLoading(false)
            setIsLoggedIn(false)
        }
    }

    /* STORE TOKEN */
    const storeToken = (token) => {
        localStorage.setItem("authToken", token)
    }    

    /* REMOVE TOKEN */
    const removeToken = () => {
        localStorage.removeItem("authToken")
    }

    /* LOGOUT USER */
    const logOutUser = () => {
        removeToken()
        authenticateUser()
    }



    useEffect(() => {
        authenticateUser()
    }, [])





    return (
        <AuthContext.Provider
            value={{
                authenticateUser,
                user,
                isLoading,
                isLoggedIn,
                storeToken,
                logOutUser
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextWrapper }


