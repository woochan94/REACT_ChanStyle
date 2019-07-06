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
        // 파일 수정 
        editFile: (_, args) => {
            console.log(args);
            const { id, url } = args; 
            return prisma.updateFile({
                data: {
                    url
                }, 
                where: {
                    id 
                }
            })
        }, 
        // 사이즈 수정 
        editSize: (_, args) => {
            const { id, size } = args;
            return prisma.updateSize({
                data: {
                    size
                },
                where: {
                    id
                }
            })
        },
        // 색상 수정
        editColor: (_, args) => {
            const { id, color } = args;
            return prisma.updateColor({
                data: {
                    color
                },
                where: {
                    id
                }
            })
        },
        // 재고 수정 
        editStock: (_, args) => {
            const { id, stock } = args;
            try {
                id.map(async(item, index) => {
                    await prisma.updateStock({
                        where: {
                            id: item 
                        }, 
                        data: {
                            stock: stock[index]
                        }
                    })
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