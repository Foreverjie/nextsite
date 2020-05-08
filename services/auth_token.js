import jwtDecode from "jwt-decode"
import Cookie from "js-cookie"
import Router from "next/router"

export const TOKEN_STORAGE_KEY = "nextSite.authToken"

export class AuthToken {
  constructor(token) {
    this.token = token
    this.decodedToken = {
      name: "",
      exp: 0,
    }

    try {
      if (token) this.decodedToken = jwtDecode(token)
      // console.log(this.decodedToken)
    } catch (e) {}
  }

  authorizationString() {
    return `Bearer ${this.token}`
  }

  expiresAt() {
    return new Date(this.decodedToken.exp * 1000)
  }

  isExpired() {
    return new Date() > this.expiresAt()
  }

  isValid() {
    return !this.isExpired
  }

  static async storeToken(token) {
    Cookie.set(TOKEN_STORAGE_KEY, token)
    await Router.push("/")
  }
}

export const tokenConfig = (token) => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
}