import React, {useState, useContext} from "react";
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

export function SignIn(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signIn, loadingAuth } = useContext(AuthContext)

    function handleLogin(){
        if(email === '' || password === ''){
            return
        }

        signIn({ email, password })
    }

    return (
        <View style={styles.container}>
            <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}
            />

            <View style={styles.inputArea}>
                <TextInput
                style={styles.input}
                placeholder="Digite seu email" 
                placeholderTextColor="#BDBDBD"
                value={email}
                onChangeText={setEmail}
                />

                <TextInput
                style={styles.input}
                placeholder="Digite sua senha" 
                placeholderTextColor="#BDBDBD"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    {loadingAuth ? (
                        <ActivityIndicator size={20} color="#1D1D2E"/>
                    ) : (
                        <Text style={styles.buttonText}>Acessar</Text>
                    )}
                </TouchableOpacity>
            </View>

            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1D1D2E"
    },

    logo: {
        marginBottom: 16,
    },

    inputArea: {
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 32
    },

    input: {
        width: "95%",
        height: 40,
        backgroundColor: "#101026",
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: "#FFF"
    },

    button: {
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3FFFA3",
        height: 40,
        borderRadius: 4
    },

    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#101026"
    }
})