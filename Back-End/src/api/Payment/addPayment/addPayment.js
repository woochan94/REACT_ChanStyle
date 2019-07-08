import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addPayment : async (_, args, { request }) => {
            const { user } = request;
            const { product, size, color, stock, count, cart } = args; 

            if(cart === undefined) {
                try {
                    await count.map(async(item, index) => {
                        const countId = await prisma.createCount({
                            count: item
                        }); 
                        await prisma.createPayment({
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
                            size: {
                                connect: {
                                    id: size[index]
                                }
                            },
                            color: {
                                connect: {
                                    id: color[index]
                                }
                            }, 
                            stock: {
                                connect: {
                                    id: stock[index]
                                }
                            }, 
                            count: {
                                connect: {
                                    id: countId.id
                                }
                            }
                        })
                    })
                    return true;
                } catch (error) {
                    console.log(error);
                    return false; 
                }
            } else {
                try {
                    await count.map(async(item, index) => {
                        const countId = await prisma.createCount({
                            count: item
                        }); 
                        await prisma.createPayment({
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
                            size: {
                                connect: {
                                    id: size[index]
                                }
                            },
                            color: {
                                connect: {
                                    id: color[index]
                                }
                            }, 
                            stock: {
                                connect: {
                                    id: stock[index]
                                }
                            }, 
                            count: {
                                connect: {
                                    id: countId.id
                                }
                            },
                            cart: {
                                connect: {
                                    id: cart[index]
                                }
                            }
                        })
                    })
                    return true;
                } catch (error) {
                    console.log(error);
                    return false; 
                }
            }
        }
    }
}