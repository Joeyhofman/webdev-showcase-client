


class UserAuthenticationService {
    constructor(http) {
        this.http = http;
    }

    async login(username, password) {
        return this.http.post('/api/login', { username: username, password: password });
    }
    
    async register(username, email, password, repeatPassword) {
        try{
            const response = await http.post('register', { username: username, email: email, password: password, repeatPassword: repeatPassword });
            const { accessToken, refreshToken, user } = response.data;
            return {accessToken: accessToken, refreshToken: refreshToken, isError: false, error: null};
        }catch(error){
            return {accessToken: null, refreshToken: null, isError: true, error: error};
        }
    }
    
    logout() {
        return this.http.post('logout', {}, {});
    }
    
}