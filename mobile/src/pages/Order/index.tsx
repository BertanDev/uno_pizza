import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native'
import { useRoute, RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { api } from '../../services/api'
import { ModalPicker } from '../../components/ModalPicker'
import { ListItem } from '../../components/ListItem'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes'

type RouteDetailProps = {
    Order: {
        number: number | string,
        order_id: string
    }
}

type OrderRouteProps = RouteProp<RouteDetailProps, 'Order'>

export type CategoryProps = {
    id: string,
    name: string
}

type ProductProps = {
    id: string,
    name: string
}

export type ItemProps = {
    id: string,
    product_id: string,
    name: string,
    amount: string | number
}

export function Order(){
    const [categories, setCategories] = useState<CategoryProps[] | []>([])
    const [products, setProducts] = useState<ProductProps[] | []>([])

    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>()

    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)
    const [modalProductVisible, setModalProductVisible] = useState(false)

    const [amount, setAmount] = useState('1')
    const [items, setItems] = useState<ItemProps[]>([])

    const route = useRoute<OrderRouteProps>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    useEffect(() => {
        async function getCategories(){
            const response = await api.get('/category')

            setCategories(response.data)
            setCategorySelected(response.data[0])
        }

        getCategories()
    }, [])

    useEffect(() => {
        async function getProducts(){
            const response = await api.get('/category/product', {
                params: {
                    category_id: categorySelected?.id
                }
            })

            setProducts(response.data)
            setProductSelected(response.data[0])
        }

        getProducts()
    }, [categorySelected])

    async function handleDeleteOrder(){
        try {
            await api.delete('/order', {
                params: {
                    order_id: route.params.order_id
                }
            })

            navigation.goBack()
        }catch(error) {
            console.log(error)
        }
    }
    
    function handleChangeCategory(item: CategoryProps){
        setCategorySelected(item)
    }

    function handleChangeProduct(item: ProductProps){
        setProductSelected(item)
    }

    async function handleAddItem(){
        const response = await api.post('/order/add', {
            order_id: route.params.order_id,
            product_id: productSelected?.id,
            amount: Number(amount)
        })

        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount
        }

        setItems(oldArray => [...oldArray, data])
    }

    async function handleDeleteItem(item_id: string){
        await api.delete('/order/remove', {
            params: {
                item_id: item_id
            }
        })

        let removeItem = items.filter(item => {
            return (item.id !== item_id)
        })

        setItems(removeItem)
    }

    function handleFinishOrder(){
        navigation.navigate('FinishOrder', {
            number: route.params?.number,
            order_id: route.params?.order_id
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <Text style={styles.title}>Mesa {route.params.number}</Text>
                {items.length === 0 && (
                    <TouchableOpacity onPress={handleDeleteOrder}>
                        <Feather name='trash-2' size={28} color="#FF3F4B"/>
                    </TouchableOpacity>
                )}
            </View>

            {categories.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}> 
                    <Text style={{ color: '#FFF' }}>
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            {products.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                    <Text style={{ color: '#FFF' }}>
                        {productSelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            <View style={styles.qntContainer}>
                <Text style={styles.qntText}>Quantidade</Text>

                <TextInput
                style={[styles.input, { width: '60%', textAlign:'center' }]}
                placeholderTextColor='#F0F0F0'
                keyboardType='numeric'
                value={amount}
                onChangeText={setAmount}
                />

            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAddItem}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={[styles.buttonNext, {opacity: items.length === 0 ? 0.3 : 1}]} 
                disabled={items.length === 0}
                onPress={handleFinishOrder}
                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, marginTop: 24 }}
            keyExtractor={(item) => item.id}
            data={items}
            renderItem={ ({item}) => <ListItem data={item} deleteItem={handleDeleteItem}/> }
            />

            <Modal
            transparent={true}
            visible={modalCategoryVisible}
            animationType="fade"
            >
                <ModalPicker
                handleCloseModal={() => setModalCategoryVisible(false)}
                options={categories}
                selectedItem={ handleChangeCategory }
                />
            </Modal>

            <Modal
            transparent={true}
            visible={modalProductVisible}
            animationType="fade"
            >
                <ModalPicker
                handleCloseModal={() => setModalProductVisible(false)}
                options={products}
                selectedItem={ handleChangeProduct }
                />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1D2E',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginRight: 14
    },
    input: {
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#FFF',
        fontSize: 20
    },
    qntContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qntText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    buttonAdd: {    
        width: '20%',
        backgroundColor: '#3FD1FF',
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonNext: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: '#3FFFA3',
        height: 40,
        width: '75%'
    },
    buttonText: {
        color: '101026',
        fontSize: 18,
        fontWeight: 'bold'
    }
})