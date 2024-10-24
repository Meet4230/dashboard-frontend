import React, { useState, useEffect } from "react";
import {
  assignEmployeesToDepartment,
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from "../../api";
import { Department } from "../../interfaces";
import { useNavigate } from "react-router-dom";

const DepartmentManagement = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [formData, setFormData] = useState<Partial<Department>>({
    departmentName: "",
    categoryName: "",
    location: "",
    salary: 0,
  });
  const [employeeIds, setEmployeeIds] = useState("");

  const categoryOptions = ["HR", "IT", "Sales", "Product", "Marketing"];

  useEffect(() => {
    fetchDepartments();
  }, [currentPage]);

  const fetchDepartments = async () => {
    try {
      const result = await getDepartments(currentPage);
      setDepartments(result.data);
      setTotalPages(Math.ceil(result.total / 5));
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedDepartment) {
        await updateDepartment(selectedDepartment._id, formData);
      } else {
        await createDepartment(formData as Department);
      }
      await fetchDepartments();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await deleteDepartment(id);
        await fetchDepartments();
      } catch (error) {
        console.error("Error deleting department:", error);
      }
    }
  };

  const handleAssignEmployees = async () => {
    if (selectedDepartment) {
      try {
        const employeeArray = employeeIds.split(",").map((id) => id.trim());
        await assignEmployeesToDepartment(selectedDepartment._id, {
          employeeIds: employeeArray,
        });
        setShowAssignModal(false);
        setEmployeeIds("");
        await fetchDepartments();
      } catch (error) {
        console.error("Error assigning employees:", error);
      }
    }
  };

  const resetForm = () => {
    setSelectedDepartment(null);
    setFormData({
      departmentName: "",
      categoryName: "",
      location: "",
      salary: 0,
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Department Management</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/employee-queries")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            View Department Queries
          </button>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Department
        </button>
      </div>

      {/* Department Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Department Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Salary</th>
              <th className="border p-2">employeeID</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept._id} className="hover:bg-gray-50">
                <td className="border p-2">{dept.departmentName}</td>
                <td className="border p-2">{dept.categoryName}</td>
                <td className="border p-2">{dept.location}</td>
                <td className="border p-2">${dept.salary.toLocaleString()}</td>
                <td className="border p-2">{dept._id}</td>
                <td className="border p-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedDepartment(dept);
                        setFormData(dept);
                        setShowModal(true);
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDepartment(dept);
                        setShowAssignModal(true);
                      }}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Assign
                    </button>
                    <button
                      onClick={() => handleDelete(dept._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {selectedDepartment ? "Edit Department" : "Add Department"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Department Name
                </label>
                <input
                  type="text"
                  value={formData.departmentName}
                  onChange={(e) =>
                    setFormData({ ...formData, departmentName: e.target.value })
                  }
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  value={formData.categoryName}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryName: e.target.value })
                  }
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Salary</label>
                <input
                  type="number"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: Number(e.target.value) })
                  }
                  className="w-full border rounded p-2"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {selectedDepartment ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Assign Employees</h2>
            <div className="space-y-4">
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignEmployees}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentManagement;
