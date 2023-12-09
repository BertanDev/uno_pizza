import { useContext } from "react"
import { ActivityIndicator, View } from "react-native"
import { AuthContext } from "../contexts/AuthContext"
import { AppRoutes } from "./app.routes"
import { AuthRoutes } from "./auth.routes"

export function Router(){
    const { isAuthenticated, isLoading } = useContext(AuthContext)

    if(isLoading){
        return (
            <View 
            style={{ 
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#1D1D2E" 
            }}>
                <ActivityIndicator size={20} color="#FFF"/>
            </View>
        )
    }

    return (
        isAuthenticated ? <AppRoutes/> : <AuthRoutes/>
    )
}