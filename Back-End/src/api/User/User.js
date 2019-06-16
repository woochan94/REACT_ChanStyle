import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        cart: ({ id }) => prisma.user({ id }).cart(), 
        buyList: ({ id }) => prisma.user({ id }).buyList()
    }
}