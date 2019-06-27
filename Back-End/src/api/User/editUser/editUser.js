import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcrypt"; 

// 비밀번호 정규식 설정 (영문, 숫자, 특수문자 조합, 8~16자리)
const chk_password = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/;

export default {
    Mutation: {
        editUser: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { name, zipCode, address, addressDetail, phone, password, confirmPassword } = args; 

            const { user } = request;

            if(password !== "" && confirmPassword !== "" && password === confirmPassword) {
                if(chk_password.test(password) === false) {
                    throw Error("비밀번호는 영문, 숫자, 특수문자 조합의 8~16자리여야 합니다.");                     
                } else {
                    bcrypt.hash(password, 10, async function(err, hash) {
                        await prisma.updateUser({
                            where: {
                                id: user.id 
                            }, 
                            data: {
                                name, 
                                zipCode, 
                                address,
                                addressDetail, 
                                phone, 
                                password: hash 
                            }
                        })
                    })
                    return true;
                }
            } else {
                await prisma.updateUser({
                    where: {
                        id: user.id 
                    }, 
                    data: {
                        name, zipCode, address, addressDetail, phone
                    }
                });
                return true;
            }
        }
    }
}