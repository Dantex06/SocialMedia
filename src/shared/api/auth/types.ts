//login

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    access_token: string;
}

export interface IRegisterRequest {
    name: string;
    surname: string;
    email: string;
    password: string;
    birthday: string;
}

export interface IRegisterResponse {
    access_token: string;
}