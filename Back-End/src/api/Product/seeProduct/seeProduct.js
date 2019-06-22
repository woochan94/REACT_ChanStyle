import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeproduct: (_, args) => {
            const { sort, mainCategory, subCategory, id } = args; 

            // 상품 하나 상세 보기 
            if ( id !== undefined) {
                return prisma.products({ where: {
                    id
                }});
            }

            // 전체 상품 보기 (Main 화면에서 사용될 것)
            else if (mainCategory === undefined && subCategory === undefined) {
                // 분류 x 
                if(sort === undefined) {
                    return prisma.products({
                        orderBy: "createdAt_DESC"
                    })
                } 
                // 전체에서 베스트 아이템 8개 
                else if (sort === "best") {
                    return prisma.products({
                        orderBy: "numberOfSales_DESC",
                        first: 8 // 첫번째로부터 8개까지만 출력 
                    })
                }
                // 전체에서 최신 아이템 8개 
                else if (sort === "new") {
                    return prisma.products({
                        orderBy: "createdAt_DESC", 
                        first: 8
                    })
                }
            }
            // MainCategory별 상품 보기 (Store 화면에서 사용될 것)
            else if(mainCategory !== undefined && subCategory === undefined) {
                // MainCategory 전체 상품 보기 
                if (sort === undefined) {
                    return prisma.products({
                        where: {
                            mainCategory
                        }, 
                        orderBy: "createdAt_DESC"
                    })
                } 
                // MainCategory 전체 중 베스트 상품 8개 
                else if (sort === "best") {
                    return prisma.products({
                        where: {
                            mainCategory
                        }, 
                        orderBy: "numberOfSales_DESC"
                    })
                }
            }
            // MainCategory > SubCategory별 상품 보기 (Store 화면에서 사용) 
            else if(subCategory !== undefined) {
                // SubCategory 전체 상품 보기 
                if(sort === undefined) {
                    return prisma.products({
                        where: {
                            subCategory
                        }, 
                        orderBy: "createdAt_DESC"
                    })
                }
                // SubCategory 전체 중 베스트 상품 8개 
                else if (sort === "best") {
                    return prisma.products({
                        where: {
                            subCategory
                        }, 
                        orderBy: "numberOfSales_DESC"
                    })
                }
            } 
        }
    }
}