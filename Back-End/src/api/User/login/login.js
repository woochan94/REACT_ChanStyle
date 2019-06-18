import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from '../../../utils';
import bcrypt from 'bcrypt';

export default {
    Mutation: {
        login: async (_, args) => {
            const { email, password } = args;
            const user = await prisma.user({ email });
        
            if( user !== null ) {
                // 암호확인 
                if(bcrypt.compareSync(password, user.password)) {
                    return generateToken(user.id); 
                } else {
                    throw Error("Wrong email/Password combination");
                }
            } 
        }
    }
}
