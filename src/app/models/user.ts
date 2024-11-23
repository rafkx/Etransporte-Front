import { Funcionario } from './funcionario';
import { Role } from './role';

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  password: string;
  funcionario: Funcionario;
  token?: string;
}

export interface JWTUser {
  id: string;
  name: string;
  email: string;
  role: string;
  funcionario: string;
}

export interface UserI {
  name: string;
  role: Role;
  email: string;
  funcionario: Funcionario;
  token?: string;
}

export interface UserUpdatePassword {
  newPassword: string;
  lastPassword: string;
}

export interface UserData {
  data: User[];
  meta: {
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
