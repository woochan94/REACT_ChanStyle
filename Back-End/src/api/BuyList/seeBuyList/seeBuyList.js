import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeBuyList: (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request); 
            const { user } = request;
            return prisma.buyLists({
                where: {
                    user: {
                        id: user.id
                    }
                }
            })
        }
    }, 
    Mutation: {
        seeBuyList2: (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request); 
            const { user } = request; 
            const { first, skip } = args;
            return prisma.buyLists({
                where: {
                    user: {
                        id: user.id
                    }
                },
                first,
                skip
            })
        }
    }
}