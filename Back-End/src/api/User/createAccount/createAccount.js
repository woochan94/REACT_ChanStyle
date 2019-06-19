import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcrypt";

// 비밀번호 정규식 설정 (영문, 숫자, 특수문자 조합, 8~16자리)
const chk_password = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/;

export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { name, email, password, zipCode, address, addressDetail, phone } = args;
            // 이메일 중복확인을 위한 코드
            // 입력한 이메일이 이미 db에 있으면 true값을 반환
            const exists = await prisma.$exists.user({ email });
            if (exists) {
                throw Error("This email is already taken");
            } else {
                // 비밀번호 정규식 확인 
                if (chk_password.test(password) === false) {
                    throw Error("비밀번호는 영문, 숫자, 특수문자 조합의 8~16자리여야 합니다."); 
                }
                // 비밀번호 암호화 진행
                bcrypt.hash(password, 10, async function(err, hash) {
                    await prisma.createUser({
                        name,
                        email,
                        password: hash,
                        zipCode,
                        address,
                        addressDetail,
                        phone
                    });
                });
                return true;
            }
        }
    }
}