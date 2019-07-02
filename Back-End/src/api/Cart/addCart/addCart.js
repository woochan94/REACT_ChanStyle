import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addCart: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { product, sizeId, colorId, stockId } = args;
            try {
                await product.map(async (_, index) => {

                    await prisma.createCart({
                        user: {
                            connect: {
                                id: user.id
                            }
                        },
                        product: {
                            connect: {
                                id: product[index]
                            }
                        },
                        sizeId: {
                            connect: {
                                id: sizeId[index]
                            }
                        },
                        colorId: {
                            connect: {
                                id: colorId[index]
                            }
                        },
                        stockId: {
                            connect: {
                                id: stockId[index]
                            }
                        },

                    })
                })
                return true;
            } catch (error) {
                return false
            }
        }
    }
}