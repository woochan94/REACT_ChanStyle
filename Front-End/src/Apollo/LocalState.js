export const defaults = {
    // localStorage에서 token의 유무에 따라 로그인 여부 판단해줌 
    isLoggedIn: Boolean(localStorage.getItem("token")) || false
}

export const resolvers = {
    Mutation: {
        logUserIn: (_, { token }, { cache }) => {
            localStorage.setItem("token", token); 
            cache.writeData({
                data: {
                    isLoggedIn: true 
                }
            });
            return null; 
        }, 
        logUserOut: (_, __, { cache }) => {
            localStorage.removeItem("token"); 
            window.location.reload();
            return null;
        }
    }
}