import jwt_decode from "jwt-decode";

const jwtLogout = (token, history) => {

    if (token) {
        const { exp } = jwt_decode(token);

        const expirationTime = (exp * 1000) - 60000
        if (Date.now() >= expirationTime) {
            localStorage.removeItem('admin');
            history?.push('/login');
        }
    }
}

export default jwtLogout;