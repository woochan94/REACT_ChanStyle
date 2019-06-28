import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addCart: async (_, args, { request, isAuthenticated}) => {
            isAuthenticated(request); 
            const { user } = request; 
            const { product, size, sizeId, color, colorId, count, countId } = args; 
            return prisma.createCart({
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
                count,
                sizeId,
                colorId,
                countId
            }) 
        }
    }
}