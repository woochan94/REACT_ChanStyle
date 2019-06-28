import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        deleteCart: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request); 
            const { id } = args;
            console.log(id);
            try {
                await prisma.deleteCart({
                    id
                });
                return true;
            } catch {
                return false;
            }
       
        }
    }
}