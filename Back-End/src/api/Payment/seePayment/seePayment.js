import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seePayment: (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request; 
            return prisma.payments({
                where: {
                    user: {
                        id: user.id 
                    }
                }
            })
        }
    }, 
    Mutation: {
        seePayment: (_, __, { request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request; 
            return prisma.payments({
                where: {
                    user: {
                        id: user.id 
                    }
                }
            })
        }
    }
}