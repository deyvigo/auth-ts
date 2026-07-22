export interface IUserRegisterRequest {
  username: string
  password: string
  name: string
  lastName: string
  profile: string
}

export interface IUserLoginRequest {
  username: string
  password: string
}
