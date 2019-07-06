import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        deletePayment: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request); 
            const { id } = args; 
            try {
                await id.map(async(item) => {
                    await prisma.deletePayment({
                        id: item
                    })
                })
                return true; 
            } catch {
                return false; 
            }
        }
    }
}