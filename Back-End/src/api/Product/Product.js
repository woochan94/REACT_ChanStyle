import { prisma } from "../../../generated/prisma-client";

export default {
    Product: {
        files: ({ id }) => prisma.product({ id }).files(), 
        sizes: ({ id }) => prisma.product({ id }).sizes(),
        colors: ({ id }) => prisma.product({ id }).colors(), 
        stocks: ({ id }) => prisma.product({ id }).stocks(),
        productDetailFile: ({ id }) => prisma.product({ id }).productDetailFile(), 
        productSizeFile: ({ id }) => prisma.product({ id }).productSizeFile()
    }
}