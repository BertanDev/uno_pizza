import Head from "next/head";
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiUpload } from 'react-icons/fi'
import styles from './styles.module.scss'
import { useState, ChangeEvent, FormEvent } from "react";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

type ItemProps = {
    id: string,
    name: string
}

type CategoryProps = {
    categoryList: ItemProps[]
}

export default function Product({ categoryList }: CategoryProps){
    const [avatarUrl, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)

    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return
        }

        const image = e.target.files[0]

        if(!image){
            return
        }

        if(image.type == 'image/jpeg' || image.type == 'image/png'){
            setImageAvatar(image)
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    function handleChangeCategory(e){
        setCategorySelected(e.target.value)
    }

    async function handleCreateProduct(e: FormEvent){
        e.preventDefault()

        try {
            const data = new FormData()

            if(name === '' || price === '' || description === '' || imageAvatar === null){
                toast.warning('Preencha todos os campos!')
                return
            }

            data.append('name', name)
            data.append('price', price)
            data.append('description', description)
            data.append('file', imageAvatar)
            data.append('category_id', categories[categorySelected].id)

            const apiClient = setupAPIClient()

            await apiClient.post('/product', data)

            toast.success('Produto cadastrado!')

        } catch(error) {
            console.log(error)
            toast.error('Erro ao cadastrar o produto.')
        }

        setName('')
        setPrice('')
        setDescription('')
        setImageAvatar(null)
        setAvatarUrl('')
    }

    return (
        <>
        <Head>
            <title>Novo Produto - Sujeito pizzaria</title>
        </Head>

        <div>
            <Header/>

            <main className={styles.container}>

                <h1>Novo produto</h1>

                <form className={styles.form} onSubmit={handleCreateProduct}>

                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload size={25} color='#FFF'/>
                        </span>

                        <input type="file" accept="image/png, image/jpeg" onChange={handleFile}/>

                        {avatarUrl && (
                            <img 
                            className={styles.preview}
                            src={avatarUrl}
                            alt="Foto do produto"
                            />
                        )}

                    </label>

                    <select value={categorySelected} onChange={handleChangeCategory}>
                        {categories.map((item, index) => {
                            return (
                                <option key={item.id} value={index}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>

                    <input
                    type="text"
                    placeholder="Digite o nome do produto"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />

                    <input
                    type="text"
                    placeholder="Preço do produto"
                    className={styles.input}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    />

                    <textarea
                    placeholder="Descreva seu produto..."
                    className={styles.input}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />

                    <button
                    type="submit"
                    className={styles.buttonAdd}
                    >
                        Cadastrar
                    </button>
                </form>
            </main>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/category')

    return {
        props: {
            categoryList: response.data
        }
    }
})