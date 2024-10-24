import axios from "axios";
import {
  AssignEmployees,
  Department,
  IDepartment,
  IUser,
  LoginData,
  RegisterUserData,
} from "../interfaces";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
  timeout: 120000,
});

export const registerUser = async (userData: RegisterUserData) => {
  try {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (loginData: LoginData) => {
  try {
    const response = await apiClient.post("/auth/login", loginData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// Create a department
export const createDepartment = async (departmentData: Department) => {
  try {
    const response = await apiClient.post(
      "/department/departments",
      departmentData
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// Update a department
export const updateDepartment = async (
  departmentId: string,
  updates: Partial<Department>
) => {
  try {
    const response = await apiClient.put(
      `/departments/${departmentId}`,
      updates
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// Get all departments with pagination
export const getDepartments = async (page: number = 1) => {
  try {
    const response = await apiClient.get(
      `/department/departments?page=${page}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// Assign employees to a department
export const assignEmployeesToDepartment = async (
  departmentId: string,
  employees: AssignEmployees
) => {
  try {
    const response = await apiClient.post(
      `/department/departments/${departmentId}/assign`,
      employees
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// Delete a department
export const deleteDepartment = async (departmentId: string) => {
  try {
    const response = await apiClient.delete(
      `/department/departments/${departmentId}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const fetchEmployeeProfile = async (): Promise<IUser> => {
  try {
    const response = await apiClient.get("/employee/profile");
    return response.data.data; // Adjust based on your API response structure
  } catch (error: any) {
    console.error("Error fetching employee profile:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};

export const fetchEmployeeDepartment =
  async (): Promise<IDepartment | null> => {
    try {
      const response = await apiClient.get("/employee/department");
      return response.data.data; // Adjust based on your API response structure
    } catch (error: any) {
      console.error("Error fetching employee department:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch department"
      );
    }
  };

export const fetchITEmployeesLocationA = async (): Promise<IUser[]> => {
  try {
    const response = await apiClient.get("/query/it-employees-location-a");
    return response.data.data; // Adjust based on your API response structure
  } catch (error: any) {
    console.error("Error fetching IT employees in location A:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch IT employees."
    );
  }
};

export const fetchSalesEmployeesSorted = async (): Promise<IUser[]> => {
  try {
    const response = await apiClient.get("/query/sales-employees-sorted");
    return response.data.data; // Adjust based on your API response structure
  } catch (error: any) {
    console.error("Error fetching sorted Sales employees:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch Sales employees."
    );
  }
};
