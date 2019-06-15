import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addCart: async (_, args, { request, isAuthenticated}) => {
            isAuthenticated(request); 
            const { user } = request; 
            const { product, size, color, count } = args; 
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
                count
            }) 
        }
    }
}