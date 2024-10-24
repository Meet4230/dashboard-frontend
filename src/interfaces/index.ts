export interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: "male" | "female" | "other";
  hobbies: string[];
  role: "employee" | "manager";
}
export interface LoginData {
  email: string;
  password: string;
}

export interface Department {
  _id: string;
  departmentName: string;
  categoryName: string;
  location: string;
  salary: number;
  employees?: string[]; // Optional for employee assignment
}

export interface AssignEmployees {
  employeeIds?: string[];
}

export interface IEmployee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Interface for the API response with pagination
export interface IPaginatedResponse<T> {
  success: boolean;
  data: T;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

// user.interface.ts
export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender?: "male" | "female" | "other";
  hobbies?: string[];
  role: "employee" | "manager";
  createdAt?: string;
  updatedAt?: string;
}

// department.interface.ts
export interface IDepartment {
  _id: string;
  departmentName: string;
  categoryName: string;
  location: string;
  salary: number;
  employees: IUser[];
  employeeID: string;
}

// interfaces/Department.ts
export interface Department {
  departmentName: string;
  categoryName: string;
  location: string;
  salary: number;
  employees?: string[] | undefined;
}

export interface AssignEmployees {
  employeeIDs?: string[];
}
