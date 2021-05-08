export type UsersResponse = {
    content: User[];
    totalPages: number;
}

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    users: User[];
}

export type Category = {
    id: number;
    name: string;
}