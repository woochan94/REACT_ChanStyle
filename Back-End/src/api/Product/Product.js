import { prisma } from "../../../generated/prisma-client";

export default {
    Product: {
        files: ({ id }) => prisma.product({ id }).files()
    }
}