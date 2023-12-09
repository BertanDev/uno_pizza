import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useState, useContext } from 'react'
import { toast } from 'react-toastify'

import { InputApp } from '../../components/Input'
import { ButtonApp } from '../../components/Button'
import { AuthContext } from '../../contexts/AuthContext'

import logoImg from '../../../public/logo.svg'
import styles from '../../../styles/Home.module.scss'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const { signUp } = useContext(AuthContext)

  function handleSignUp(event: FormEvent){
    event.preventDefault()

    if(name === '' || email === '' || password === ''){
      toast.warning('Preencha todos os campos!')
      return
    }

    setLoading(true)

    const data = {
      name,
      email,
      password
    }

    signUp(data)

    setLoading(false)
  }

  return (
    <>
    <Head>
      <title>Faça seu cadatro agora!</title>
    </Head>
  
    <div className={styles.container}>
      <Image src={logoImg} alt=''/>

      <div className={styles.loginContainer}>
        <h1>Criando sua conta!</h1>

        <form onSubmit={handleSignUp}>
            <InputApp
                placeholder='Digite seu nome'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <InputApp
                placeholder='Digite seu email'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <InputApp
                placeholder='Digite sua senha'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <ButtonApp 
                type='submit'
                isLoading={loading}
            >
                Cadastrar
            </ButtonApp>
        </form>

        <Link href='/'>
          <span className={styles.text}>Já possui uma conta? Faça login!</span>
        </Link>      
      </div>
    </div>
    </>
   
  )
}
