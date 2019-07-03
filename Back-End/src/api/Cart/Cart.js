import { prisma } from "../../../generated/prisma-client";

export default {
    Cart: {
        user: ({ id }) => prisma.cart({ id }).user(),
        product: ({ id }) => prisma.cart({ id }).product(),
        sizeId: ({ id }) => prisma.cart({ id }).sizeId(),
        colorId: ({ id }) => prisma.cart({ id }).colorId(), 
        stockId: ({ id }) => prisma.cart({ id }).stockId(),
        count: ({ id }) => prisma.cart({ id }).count()
    }
}