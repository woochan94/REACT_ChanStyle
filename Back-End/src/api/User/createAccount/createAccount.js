import { prisma } from "../../../../generated/prisma-client"; 

export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { name, email, password, zipCode, address, addressDetail, phone } = args; 
            // 이메일 중복확인을 위한 코드 
            // 입력한 이메일이 이미 db에 있으면 true값을 반환
            const exists = await prisma.$exists.user({
                email
            }); 
            if (exists) {
                throw Error("This email is already taken"); 
            } else {
                await prisma.createUser({
                    name, 
                    email,
                    password,
                    zipCode,
                    address,
                    addressDetail,
                    phone
                });
                return true;
            }
        }
    }
}