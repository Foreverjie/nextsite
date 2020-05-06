import jwtDecode from "jwt-decode"
import Cookie from "js-cookie"
import Router from "next/router"

const TOKEN_STORAGE_KEY = "nextSite.authToken"

export class AuthToken {
  constructor(token) {
    this.decodedToken = {
      name: "",
      exp: 0,
    }

    try {
      if (token) this.decodedToken = jwtDecode(token)
      // console.log(this.decodedToken)
    } catch (e) {}
  }

  get authorizationString() {
    return `Bearer ${this.token}`
  }

  get expiresAt() {
    return new Date(this.decodedToken.exp * 1000)
  }

  get isExpired() {
    return new Date() > this.expiresAt
  }

  get isValid() {
    return !this.isExpired
  }

  static async storeToken(token) {
    Cookie.set(TOKEN_STORAGE_KEY, token)
    await Router.push("/")
  }
}
