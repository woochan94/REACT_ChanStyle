import passport from "passport"; 
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from './../generated/prisma-client/';

const jwtOptions = {
    // Authorization 헤더에서 jwt를 찾는 역할 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: process.env.JWT_SECRET
}; 

const verifyUser = async (payload, done) => {
    try {
        const user = await prisma.user({ id: payload.id });
        if (user !== null) {
            return done(null, user); 
        } else {
            return done(null, false); 
        }
    } catch (err) {
        return done(err, false); 
    }
}

export const authenticateJwt = (req, res, next) => passport.authenticate("jwt", { sessions: false }, (err, user) => {
    if(user) {
        // verifyUser에서 사용자를 받아온 후, 사용자 정보를 req객체에 붙여주는 역할 
        req.user = user; 
    } 
    next();
})(req, res, next); 

// JWT는 토큰을 입력받아서 정보를 해석한 후 해석된 정보를 콜백 함수로 전달해 준다. 
// strategy가 모든 작업을 한 후 결과물을 payload에 전달해줌 
passport.use(new Strategy(jwtOptions, verifyUser)); 
passport.initialize();