import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '1c6fc31b-2023-4b84-8640-ac2aa0578411',
    },
})

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type LoginMeType = {
    id: number
    login: string
    email: string
}

export type LoginParamsType= {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}

export const authAPI = {
    login(data:LoginParamsType) {
        return instance.post<ResponseType<LoginMeType|{}>>('auth/login', data)
            .then(response => response.data);
    },
    logout() {
        return instance.delete<ResponseType<{}>>('auth/login')
            .then(response => response.data);
    },
    me() {
        return instance.get<ResponseType<{userId:number}>>('auth/me')
            .then(response => response.data);

    }
}