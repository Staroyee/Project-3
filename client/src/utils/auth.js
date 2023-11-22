import { jwtDecode } from "jwt-decode";

//
class AuthService {
  getProfile() {
    return jwtDecode(this.getToken());
  }
  // Checks if there is a saved token and it's still valid
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    return false;
  }
  // Retrieves the user token from localStorage
  getToken() {
    return localStorage.getItem("id_token");
  }
  // Saves user token to localStorage
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // this will reload the page and reset the state of the application
    window.location.reload();
  }
}

export default new AuthService();
