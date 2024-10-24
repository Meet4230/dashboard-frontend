import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api";
import { RegisterUserData } from "../../interfaces";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<RegisterUserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "male", // Default value
    hobbies: [],
    role: "employee", // Default role can be set to employee
  });

  const [newHobby, setNewHobby] = useState<string>(""); // State to hold new hobby input
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHobbyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewHobby(e.target.value);
  };

  const addHobby = () => {
    if (newHobby.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        hobbies: [...prev.hobbies, newHobby.trim()],
      }));
      setNewHobby(""); // Clear the input after adding
    }
  };

  const removeHobby = (hobbyToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((hobby) => hobby !== hobbyToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await registerUser(formData);
      console.log("Registration successful:", response);
      navigate("/"); // Redirect to login after successful registration
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-700">
          Create an Account
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Hobbies</label>
            <div className="flex">
              <input
                type="text"
                value={newHobby}
                onChange={handleHobbyChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150"
                placeholder="Add a hobby"
              />
              <button
                type="button"
                onClick={addHobby}
                className="ml-2 bg-blue-600 text-white rounded-md px-3 py-2 hover:bg-blue-700 transition duration-200"
              >
                Add
              </button>
            </div>
            <ul className="mt-2 list-disc list-inside">
              {formData.hobbies.map((hobby, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-gray-700"
                >
                  <span>{hobby}</span>
                  <button
                    type="button"
                    onClick={() => removeHobby(hobby)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150"
              required
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
          >
            Signup
          </button>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
