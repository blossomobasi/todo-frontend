export interface Todo {
    _id: number;
    description: string;
    completed: boolean;
    createdAt: string;
    remainder?: string;
    __v: number;
}

export interface TodoInput {
    description: string;
    remainder?: string;
}
