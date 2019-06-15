import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        upload: async (_, args, { request, isAuthenticated}) => {
            isAuthenticated(request); 
            const { name,
                    price, 
                    mainCategory, 
                    subCategory, 
                    files, 
                    colors, 
                    sizes, 
                    stocks,
                    productDetailFiles,
                    productSizeFiles,
                } = args; 
            // file과 option 없이 product 생성 
            const product = await prisma.createProduct({ name, price, mainCategory, subCategory }); 
            files.forEach(async file => {
                await prisma.createFile({
                    url: file, 
                    product: {
                        connect: {
                            id: product.id
                        }
                    }
                })
            }); 
            colors.forEach(async color => {
                await prisma.createColor({
                    color, 
                    product: {
                        connect: {
                            id: product.id
                        }
                    }
                })
            }); 
            sizes.forEach(async size => {
                await prisma.createSize({
                    size, 
                    product: {
                        connect: {
                            id: product.id
                        }
                    }
                })
            }); 
            stocks.forEach(async stock => {
                await prisma.createStock({
                    stock, 
                    product: {
                        connect: {
                            id: product.id
                        }
                    }
                })
            }); 
            productDetailFiles.forEach(async productDetailFile => {
                await prisma.createProductDetailFile({
                    productDetailFile, 
                    product: {
                        connect: {
                            id: product.id 
                        }
                    }
                })
            }); 
            productSizeFiles.forEach(async productSizeFile => {
                await prisma.createProductSizeFile({
                    productSizeFile,
                    product: {
                        connect: {
                            id: product.id 
                        }
                    }
                })
            });
            return product
        }
    }
}