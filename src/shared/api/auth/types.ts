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
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjE1NjgzNTMsImlkIjoxOH0.y9IVx1xliP8L4fkmlNoxLhnHHQyxboNLq9AYKvpzGYM"
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
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjE1NjgzNTMsImlkIjoxOH0.y9IVx1xliP8L4fkmlNoxLhnHHQyxboNLq9AYKvpzGYM"
}