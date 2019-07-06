import { prisma } from "../../../generated/prisma-client";

export default {
    BuyList: {
        product: ({ id }) => prisma.buyList({ id }).product(),
        user: ({ id }) => prisma.buyList({ id }).user(),
        size: ({ id }) => prisma.buyList({ id }).size(), 
        color: ({ id }) => prisma.buyList({ id }).color(), 
        quantity: ({ id }) => prisma.buyList({ id }).quantity()
    }
}