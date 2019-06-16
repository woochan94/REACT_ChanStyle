import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addBuyList: (_, args, { request, isAuthenticated}) => {
            isAuthenticated(request); 
            const { user } = request; 
            const { product, size, color, count } = args; 
            return prisma.createBuyList({
                user: {
                    connect: {
                        id: user.id 
                    }
                }, 
                product: {
                    connect: {
                        id: product
                    }
                }, 
                size,
                color,
                count
            })
        }
    }
}