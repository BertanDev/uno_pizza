import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"
import { Header } from "../../components/Header"
import { FiRefreshCcw } from 'react-icons/fi'
import styles from './styles.module.scss'
import { setupAPIClient } from "../../services/api"
import { useState } from "react"

import Modal from 'react-modal'
import { ModalOrder } from "../../components/ModalOrder"

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface DashboardProps {
    orders: OrderProps[];
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    }
    order: {
        id: string;
        table: string | number;
        status: boolean;
        name: string | null
    }
}

export default function Dashboard({ orders }: DashboardProps){
    const [listOrders, setListOrders] = useState(orders || [])

    const [modalItem, setModalItem] = useState<OrderItemProps[]>()
    const [isModalVisible, setIsModalVisible] = useState(false)

    function handleCloseModal(){
        setIsModalVisible(false)
    }

    async function handleOpenModalView(id: string){
        const apiClient = setupAPIClient()

        const response = await apiClient.get('/order/detail', {
            params: {
                order_id: id
            }
        })

        setModalItem(response.data)
        setIsModalVisible(true)
    }

    async function handleFinishOrder(id: string){
        const apiClient = setupAPIClient()

        await apiClient.put('/order/finish', {
            order_id: id
        })

        const response = await apiClient.get('/orders')

        setListOrders(response.data)

        setIsModalVisible(false)
    }

    async function handleRefreshOrder(){
        const apiClient = setupAPIClient()

        const response = await apiClient.get('/orders')
        setListOrders(response.data)
    }

    Modal.setAppElement('#__next')

    return (
        <>
        <Head>
            <title>Painel - Sujeito Pizzaria</title>
        </Head>

        <div>
            <Header/>

            <main className={styles.container}>
                <div className={styles.headerContainer}>
                    <h1>Últimos pedidos</h1>

                    <button onClick={handleRefreshOrder}>
                        <FiRefreshCcw size={25} color='#3fffa3'/>
                    </button>
                </div>

                <article className={styles.listOrders}>

                    {listOrders.length === 0 && (
                        <span className={styles.emptyOrders}>
                            Nenhum pedido em aberto...
                        </span>
                    )}

                    {listOrders.map(item => (
                            <section key={item.id} className={styles.orderItem}>
                                <button onClick={() => handleOpenModalView(item.id)}>
                                    <div className={styles.tag}></div>
                                    <span>Mesa {item.table}</span>
                                </button>
                            </section>
                    ))}

                    

                </article>
            </main>

            {isModalVisible && (
                <ModalOrder
                    isOpen={isModalVisible}
                    onRequestClose={handleCloseModal}
                    order={modalItem}
                    finishOrder={handleFinishOrder}
                />
            )}
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async(ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/orders')

    return {
        props: {
            orders: response.data
        }
    }
}) 