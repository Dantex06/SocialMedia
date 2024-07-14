//login

export interface ILoginRequest {
    email: string;
    password: string;
}



export interface ILoginResponse {
    "access": string,
    "profile": {
        "id": number,
        "name": string,
        "surname": string,
        "email": string,
        "country": {
            "id": number,
            "name": "Estonia",
            "alpha2": "EE",
            "alpha3": "EST",
            "region": "Europe"
        },
        "is_public": boolean,
        "image": string,
        "birthday": string
    },
    "refresh": string
}

export interface IRefreshRequest {
    refresh: string;
}

export interface IRefreshResponse {
    "access": string,
    "refresh": string,
}

export interface IRegisterRequest {
    name: string;
    surname: string;
    email: string;
    password: string;
    birthday: string;
}

export interface IRegisterResponse {
    "access": string,
    "profile": {
        "id": number,
        "name": string,
        "surname": string,
        "email": string,
        "country": {
            "id": number,
            "name": "Estonia",
            "alpha2": "EE",
            "alpha3": "EST",
            "region": "Europe"
        },
        "is_public": boolean,
        "image": string,
        "birthday": string
    },
    "refresh": string
}

