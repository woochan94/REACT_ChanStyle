import { prisma } from "../../../../generated/prisma-client"; 
import pbkdf2 from "pbkdf2-password"; 

const hasher = pbkdf2(); 

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
                // 비밀번호 암호화 
                hasher({ password }, async (_, __, salt, hasher) => {
                    await prisma.createUser({
                        name, 
                        email,
                        salt, 
                        password: hasher,
                        zipCode,
                        address,
                        addressDetail,
                        phone
                    });
                })
                return true;
            }
        }
    }
}