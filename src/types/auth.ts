import { User } from "./user";

export interface Login {
    email: string;
    password: string;
}

export interface Signup {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    status: string;
    token: string;
    data: {
        user: User;
    };
}
