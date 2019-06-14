import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editUser: (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { name, zipCode, address, addressDetail, phone } = args;
            const { user } = request;
            return prisma.updateUser({
                where: {
                    id: user.id 
                }, 
                data: {
                    name, zipCode, address, addressDetail, phone
                }
            });
        }
    }
}