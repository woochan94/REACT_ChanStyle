import { prisma } from "../../../generated/prisma-client";

export default {
    Cart: {
        user: ({ id }) => prisma.cart({ id }).user(),
        product: ({ id }) => prisma.cart({ id }).product()
    }
}