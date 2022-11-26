export interface IUser {
    email: string,
    image: string
}

export interface AuthState {
    isAuth: boolean,
    user?: IUser
}

export enum AuthActionTypes {
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGOUT = "LOGOUT"
}