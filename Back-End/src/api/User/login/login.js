import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from '../../../utils';
import bcrypt from 'bcrypt';

// 비밀번호 정규식 설정 (영문, 숫자, 특수문자 조합, 8~16자리)
const chk_password = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/;

export default {
    Mutation: {
        login: async (_, args) => {
            const { email, password } = args;
            const user = await prisma.user({ email });
            if( user !== null ) {
                // 비밀번호 정규식 확인 
                if (chk_password.test(password) === false) {
                    throw Error("비밀번호는 영문, 숫자, 특수문자 조합의 8~16자리여야 합니다."); 
                }
                // 비밀번호 암호화 확인  
                if(bcrypt.compareSync(password, user.password)) {
                    return generateToken(user.id); 
                } else {
                    throw Error("Wrong email/Password combination");
                }
            } else {
                throw Error("존재하지 않는 이메일입니다.");
            }
        }
    }
}
