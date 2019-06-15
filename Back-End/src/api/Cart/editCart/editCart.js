import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editCart: (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request); 
            const { id, count } = args; 
            return prisma.updateCart({
                where: {
                    id
                }, 
                data: {
                    count
                }
            })
        }
    }
}