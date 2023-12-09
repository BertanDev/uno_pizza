import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Dashboard } from "../pages/Dashboard"
import { FinishOrder } from "../pages/FinishOrder"
import { Order } from "../pages/Order"


export type StackParamsList = {
    Dashboard: undefined,
    Order: {
        number: number | string,
        order_id: string
    },
    FinishOrder: {
        number: string | number,
        order_id: string
    }
}

const Stack = createNativeStackNavigator<StackParamsList>()

export function AppRoutes(){
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="Dashboard" 
            component={Dashboard} 
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name="Order" 
            component={Order} 
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name="FinishOrder" 
            component={FinishOrder} 
            options={{ 
                title: 'Finalizando',
                headerStyle:{
                    backgroundColor: '#1D1D2E',
                },
                headerTintColor: '#FFF'
             }}
            />
        </Stack.Navigator>
    )
}