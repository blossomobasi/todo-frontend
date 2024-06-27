export interface User {
    _id: string;
    username: string;
    email: string;
    role: ["user"];
    createdAt: string;
    __v: number;
}

export interface UserResponse {
    status: string;
    data: {
        user: User;
    };
}
