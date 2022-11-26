export interface IUser {
    email: string,
    image: string
}

export interface AuthState {
    isAuth: boolean,
    user?: IUser
}