import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeCart: (_, __, { request , isAuthenticated }) => {
            isAuthenticated(request); 
            const { user } = request; 
            return prisma.carts({
                where: {
                    user: {
                        id: user.id
                    }
                }
            })
        }
    }
}