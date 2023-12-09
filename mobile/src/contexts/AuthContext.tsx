import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, createContext, ReactNode, useEffect } from 'react'
import { api } from '../services/api'

type AuthContextProps = {
    user: UserProps,
    isAuthenticated: boolean,
    signIn: (credentials: SignInProps) => Promise<void>,
    isLoading: boolean,
    loadingAuth: boolean,
    signOut: () => Promise<void>
}

type UserProps = {
    name: string,
    email: string,
    id: string,
    token: string
}

type AuthProviderProps = {
    children: ReactNode
}

type SignInProps = {
    email: string,
    password: string
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps){
    const [isLoading, setLoading] = useState(true)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [user, setUser] = useState<UserProps>({
        name: '',
        email: '',
        id: '',
        token: ''
    })
    const isAuthenticated = !!user.name

    useEffect(() => {
        async function getUser(){
            const userInfo = await AsyncStorage.getItem("@sujeitopizzaria")
            const hasUser: UserProps = JSON.parse(userInfo || '{}')

            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    token: hasUser.token,
                    email: hasUser.email
                })
            }

            setLoading(false)

        }

        getUser()
    }, [])

    async function signIn({ email, password }: SignInProps){
        setLoadingAuth(true)

        try {
            const response = await api.post('/session', {
                email,
                password
            })

            const { name, id, token } = response.data

            const data = {
                ...response.data
            }
            
            await AsyncStorage.setItem('@sujeitopizzaria', JSON.stringify(data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id,
                name,
                email,
                token,
            })
        } catch(error) {
            console.log('Erro ao acessar', error)
        }

        setLoadingAuth(false)

    }

    async function signOut(){
        await AsyncStorage.clear()
        .then(() => {
            setUser({
                id: '',
                name: '',
                email: '',
                token: ''
            })
        })
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, isLoading, loadingAuth, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}