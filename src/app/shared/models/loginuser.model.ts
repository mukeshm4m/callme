export class LoginUser {

  constructor(private id: string,
              private version: string,
              private name: string,
              private email: string,
              private expiry: string,
              private token: string,
              private googleLogin: boolean,
              private permissions: object,
              private roles: object,
              ) {
  }
}
