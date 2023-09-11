import { Role } from "./role";

export interface User {
    
    id: string;
    name: string;
    role: Role;
    email: string;
    password: string;
    token?: string;
    
}

export interface UserI {
    
    name: string;
    role: Role;
    email: string;
    token?: string;
    
}