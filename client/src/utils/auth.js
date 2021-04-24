import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        // check for existing token
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try{
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // retrieve token from local storage
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        // save token to local storage
        localStorage.setItem(id_token, idToken);

        window.location.assign('/');
    }

    logout() {
        // clear user token and profile data from localStorage
        localStorage.removeItem('id_token');

        // reload the page and reset application state
        window.location.assign('/');
    }
}

export default new AuthService();