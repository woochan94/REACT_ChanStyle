import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addBuyList: async (_, args, { request, isAuthenticated}) => {
            isAuthenticated(request); 
            const { user } = request; 
            const { product, size, color, quantity } = args; 
            try {
                await quantity.map(async(item, index) => {
                    const quantityId = await prisma.createQuantity({
                        quantity: item
                    }); 
                    await prisma.createBuyList({
                        user: {
                            connect: {
                                id: user.id 
                            }
                        }, 
                        product: {
                            connect: {
                                id: product[index]
                            }
                        }, 
                        size: {
                            connect: {
                                id: size[index]
                            }
                        }, 
                        color: {
                            connect: {
                                id: color[index]
                            }
                        }, 
                        quantity: {
                            connect: {
                                id: quantityId.id
                            }
                        }
                    })
                })
                return true; 
            } catch {
                return false; 
            }
            // return prisma.createBuyList({
            //     user: {
            //         connect: {
            //             id: user.id 
            //         }
            //     }, 
            //     product: {
            //         connect: {
            //             id: product
            //         }
            //     }, 
            //     size,
            //     color,
            //     count
            // })
        }
    }
}