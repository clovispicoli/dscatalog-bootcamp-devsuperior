export type UsersResponse = {
    content: User[];
    totalPages: number;
}

export type User = {
    id: number;
    firtName: string;
    lastName: string;
    email: string;
    password: string;
}

export type Category = {
    id: number;
    name: string;
}