import Head from "next/head";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Header } from "../../components/Header";
import { api } from '../../services/apiClient'
import styles from './styles.module.scss'

import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Category(){
    const [nameCategory, setNameCategory] = useState('')

    async function handleCreateCategory(event: FormEvent){
        event.preventDefault()

        if(nameCategory === ''){
            toast.warning('Você deve informar um nome para a categoria!')
            return
        }

        const response = await api.post('/category', {
            name: nameCategory
        })

        console.log(response.data)
        toast.success('Categoria cadastrada!')
        setNameCategory('')
    }

    return (
        <>
        <Head>
            <title>Nova Categoria - Sujeito Pizzaria</title>
        </Head>

        <div>
            <Header/>

            <main className={styles.container}>
                <h1>Cadastrar nova categoria</h1>

                <form className={styles.form} onSubmit={handleCreateCategory}>
                    <input 
                    type="text"
                    placeholder="Digite o nome da categoria"
                    className={styles.input}
                    value={nameCategory}
                    onChange={(e) => setNameCategory(e.target.value)}
                    />

                    <button className={styles.buttonAdd} type="submit">
                        Cadastrar
                    </button>
                </form>
            </main>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth( async (ctx) => {
    return {
        props: {}
    }
})