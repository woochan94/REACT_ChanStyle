import { prisma } from "../../../../generated/prisma-client"; 

export default {
    // product 기본 정보 수정 
    Mutation: {
        editProduct: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request); 
            const {
                id, 
                name, 
                price,
                mainCategory,
                subCategory
            } = args; 
            const product = await prisma.$exists.product({ id }); 
            if (product) {
                return prisma.updateProduct({
                    data: {
                        name, 
                        price,
                        mainCategory, 
                        subCategory
                    }, 
                    where: {
                        id 
                    }
                })
            } else {
                throw Error("You can't do that");
            }
        }, 
        // 판매량 수정 
        editNumberOfSales: (_, args) => {
            const { id, saleCount } = args; 
            try {
                id.map(async(item, index) => {
                    await prisma.updateProduct({
                        where: {
                            id: item 
                        }, 
                        data: {
                            numberOfSales: saleCount[index]
                        }
                    })
                })
                return true;
            } catch {
                return false; 
            }
        },

        // 파일 수정 
        editFile: async (_, args) => {
            const { fileId, file } = args; 
            file.forEach(async url => {
                await prisma.updateFile({
                    where: {
                        id: fileId
                    }, 
                    data: {
                        url
                    }
                })
            })
            return true;
        }, 
        // 사이즈 수정 
        editSize: (_, args) => {
            const { productId, sizeId, sizeValue } = args;
            try {
                sizeValue.map(async (item,index) => {
                    if(sizeId.length > index) {
                        await prisma.updateSize({
                            where: {
                                id: sizeId[index]
                            }, 
                            data: {
                                size: item
                            }
                        })
                    } else {
                        await prisma.createSize({
                            size: item, 
                            product: {
                                connect: {
                                    id: productId
                                }
                            }
                        })
                    }
                })
                return true;
            } catch {
                return false;
            }
        },
        // 색상 수정
        editColor: (_, args) => {
            const { productId, colorId, colorValue } = args;
            try {
                colorValue.map(async (item,index) => {
                    if(colorId.length > index) {
                        await prisma.updateColor({
                            where: {
                                id: colorId[index]
                            }, 
                            data: {
                                color: item
                            }
                        })
                    } else {
                        await prisma.createColor({
                            color: item, 
                            product: {
                                connect: {
                                    id: productId
                                }
                            }
                        })
                    }
                })
                return true;
            } catch {
                return false;
            }
        },
        // 재고 수정 
        editStock: (_, args) => {
            const { productId, stockId, stockValue } = args;
            try {
                stockValue.map(async(item, index) => {
                    if(stockId.length > index) {
                        await prisma.updateStock({
                            where: {
                                id: stockId[index] 
                            }, 
                            data: {
                                stock: item
                            }
                        })
                    } else {
                        await prisma.createStock({
                            stock: item, 
                            product: {
                                connect: {
                                    id: productId
                                }
                            }
                        })
                    }
                })   
                return true;
            } catch {
                return false; 
            }
        }, 
        // 상품디테일 파일 수정 
        editProductDetailFile: (_, args) => {
            const { id, productDetailFile } = args;
            return prisma.updateProductDetailFile({
                data: {
                    productDetailFile
                },
                where: {
                    id
                }
            })
        }, 
        // 사이즈 파일 수정 
        editProductSizeFile: async (_, args) => {
            const { id, productSizeFile } = args;
            return prisma.updateProductSizeFile({
                data: {
                    productSizeFile
                },
                where: {
                    id
                }
            })
        }
    }
}