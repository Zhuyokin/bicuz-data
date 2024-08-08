const TokenKey = 'token'
const TokenPrefix = 'Bearer '
function isLogin() {
  return !!localStorage.getItem(TokenKey)
}
function getToken() {
  return localStorage.getItem(TokenKey)
}
function setToken(token: string) {
  localStorage.setItem(TokenKey, token)
}
function clearToken() {
  localStorage.removeItem(TokenKey)
}
export { TokenPrefix, clearToken, getToken, isLogin, setToken }
