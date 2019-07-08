import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        deleteCart: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request); 
            const { id } = args;
            try {
                await id.map(async(item) => {
                    await prisma.deleteCart({
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