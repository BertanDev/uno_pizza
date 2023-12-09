import prismaClient from "../../prisma";

interface RemoveOrderRequest {
    order_id: number
}

class RemoveOrderService{
    async execute({ order_id }){
        const order = await prismaClient.order.delete({
            where: {
                id: order_id
            }
        })

        return order
    }
}

export { RemoveOrderService }