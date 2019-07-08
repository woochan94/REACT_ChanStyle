import { prisma } from "../../../generated/prisma-client";

export default {
    Payment: {
        user: ({ id }) => prisma.payment({ id }).user(),
        product: ({ id }) => prisma.payment({ id }).product(),
        size: ({ id }) => prisma.payment({ id }).size(),
        color: ({ id }) => prisma.payment({ id }).color(), 
        stock: ({ id }) => prisma.payment({ id }).stock(),
        count: ({ id }) => prisma.payment({ id }).count(),
        cart: ({ id }) => prisma.payment({ id }).cart()
    }
}