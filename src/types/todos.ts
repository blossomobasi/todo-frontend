export interface Todo {
    _id: number;
    description: string;
    completed: boolean;
    createdAt: string;
    reminder?: string;
    __v: number;
}

export interface TodoInput {
    description: string;
    reminder?: string;
}

export interface TodoResponse {
    status: string;
    results: number;
    data: {
        todos: Todo[];
    };
}
