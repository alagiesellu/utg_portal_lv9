export class TokenStorage {

    static isAuthenticated() {
        return this.getToken() !== null;
    }

    static getAuthentication() {
        return {
            headers: { 'Authorization': 'Bearer ' + this.getToken() }
        };
    }

    static getNewToken() {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/token/refresh', { refresh_token: this.getRefreshToken() })
                .then(response => {

                    this.storeToken(response.data.token);
                    this.storeRefreshToken(response.data.refresh_token);

                    resolve(response.data.token);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static storeToken(token){
        this.$cookies.set(window.cookies_key_start+'token', token);
        localStorage.setItem(TokenStorage.LOCAL_STORAGE_TOKEN, token);
    }

    static storeRefreshToken(refreshToken){
        localStorage.setItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN, refreshToken);
    }

    static clear(){
        this.$cookies.set(window.cookies_key_start+'token', res.data.success.user['token']);
        localStorage.removeItem(TokenStorage.LOCAL_STORAGE_TOKEN);
        localStorage.removeItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
    }

    static getRefreshToken(){
        return localStorage.getItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
    }

    static getToken(){
        return localStorage.getItem(TokenStorage.LOCAL_STORAGE_TOKEN);
    }
}
