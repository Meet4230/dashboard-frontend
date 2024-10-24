import { useEffect, useState } from "react";
import {
  fetchITEmployeesLocationA,
  fetchSalesEmployeesSorted,
} from "../../api";
import { IUser } from "../../interfaces";

const EmployeeQueriesPage = () => {
  const [itEmployees, setITEmployees] = useState<IUser[]>([]);
  const [salesEmployees, setSalesEmployees] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [itData, salesData] = await Promise.all([
          fetchITEmployeesLocationA(),
          fetchSalesEmployeesSorted(),
        ]);
        setITEmployees(itData);
        setSalesEmployees(salesData);
      } catch (err) {
        setError("Failed to load employee data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const EmployeeTable = ({
    employees,
    title,
  }: {
    employees: IUser[];
    title: string;
  }) => (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {employees.length === 0 ? (
        <p className="text-gray-500">No employees found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{employee.firstName}</td>
                  <td className="px-6 py-4 text-sm">{employee.email}</td>
                  <td className="px-6 py-4 text-sm">{employee.gender}</td>
                  <td className="px-6 py-4 text-sm">{employee.role || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-4 bg-red-100 text-red-700 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Employee Reports</h1>

      <EmployeeTable
        employees={itEmployees}
        title="IT Department Employees (Location starting with 'A')"
      />

      <EmployeeTable
        employees={salesEmployees}
        title="Sales Department Employees (Sorted by Name)"
      />
    </div>
  );
};

export default EmployeeQueriesPage;
