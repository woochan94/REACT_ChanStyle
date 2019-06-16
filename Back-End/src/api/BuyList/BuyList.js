import { prisma } from "../../../generated/prisma-client";

export default {
    BuyList: {
        product: ({ id }) => prisma.buyList({ id }).product(),
        user: ({ id }) => prisma.buyList({ id }).user()
    }
}