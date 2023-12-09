import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { FormEvent, useContext, useState } from 'react'
import { toast } from 'react-toastify'

import { AuthContext } from '../contexts/AuthContext'

import { InputApp } from '../components/Input'
import { ButtonApp } from '../components/Button'

import logoImg from '../../public/logo.svg'
import styles from '../../styles/Home.module.scss'
import { canSSRGuest } from '../utils/canSSRGuest'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const { signIn } = useContext(AuthContext)

  async function handleLogin(event: FormEvent){
    event.preventDefault()

    if(email === '' || password === ''){
      toast.warning('Preencha todos os campos!')
      return
    }

    setLoading(true)

    const data = {
      email,
      password
    }

    await signIn(data)

    setLoading(false)
  }

  return (
    <>
    <Head>
      <title>Pizzaria | Faça seu login</title>
    </Head>
  
    <div className={styles.container}>
      <Image src={logoImg} alt=''/>

      <div className={styles.loginContainer}>
        <form onSubmit={handleLogin}>
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
            Acessar
          </ButtonApp>
        </form>

        <Link href='/signup'>
          <span className={styles.text}>Não possui uma conta? Cadastre-se</span>
        </Link>      
      </div>
    </div>
    </>
   
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props:{}
  }
} )
