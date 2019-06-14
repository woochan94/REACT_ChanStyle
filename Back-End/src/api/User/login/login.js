import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from '../../../utils';
import pbkdf2 from "pbkdf2-password";

const hasher = pbkdf2();

export default {
    Mutation: {
        login: async (_, args, { request }) => {
            console.log(request.user);
            const { email, password } = args;
            const user = await prisma.user({ email });
            // hasher({ password, salt: user.salt }, async (err, pass, salt, hash) => {
            //     if(hash === user.password) {
            //         // 여기서 토큰이 발행되어야 하는데 안됨 ... 
            //         return await generateToken(user.id);
            //     } else {

            //     }
            // }); 
            if( user !== null && user.password === password) {
                return generateToken(user.id); 
            } else {
                throw Error("Wrong email secret combination"); 
            }
        }
    }
}
