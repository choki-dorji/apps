import { createContext, useEffect, useState } from "react";
import { Provider } from "react";
import { Alert } from "react-native";
import POpup from "../components/ui/Popup";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token) =>{},
    logout: () =>{},
})

function AuthContextProvider({children}){
    const [authToken, setAuthToken] = useState()
    
    function authenticate(token){
        setAuthToken(token);
        AsyncStorage.setItem('token', token)
    }
    
    function logout(){
        setAuthToken(null)
        Alert.alert("Success", "Successfully logged out")
        AsyncStorage.removeItem('token')
        // return(
        //     <POpup message="succcessfully logout"/>
        // )
    }

    const value={
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout
    }

    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
    )
}

export default AuthContextProvider