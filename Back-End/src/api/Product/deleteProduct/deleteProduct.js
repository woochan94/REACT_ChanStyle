import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        deleteProduct: async (_, args) => {
            const { id } = args; 
            try {
                await prisma.deleteProduct({
                    id
                });
                return true; 
            } catch {
                return false; 
            }
        }
    }
}