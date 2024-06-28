export interface Todo {
    _id: string;
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

export interface TodosResponse {
    status: string;
    results: number;
    data: {
        todos: Todo[];
    };
}

export interface TodoResponse {
    status: string;
    data: {
        todo: Todo & {
            user: {
                _id: string;
                username: string;
                email: string;
            };
        };
    };
}

export interface UpdateTodoInput {
    description?: string;
    reminder?: string;
    completed?: boolean;
}
