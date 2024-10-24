import { useEffect, useState } from "react";
import { fetchEmployeeDepartment, fetchEmployeeProfile } from "../../api";
import { IDepartment, IUser } from "../../interfaces";

const EmployeeProfilePage = () => {
  const [profile, setProfile] = useState<IUser | null>(null);
  const [department, setDepartment] = useState<IDepartment | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileData, departmentData] = await Promise.all([
          fetchEmployeeProfile(),
          fetchEmployeeDepartment(),
        ]);
        setProfile(profileData);
        setDepartment(departmentData);
        setError("");
      } catch (err) {
        setError("Failed to load employee data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-100 text-red-700 rounded-lg">
        <p className="font-semibold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Employee Profile</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 block">Name</label>
              <p className="font-medium">
                {profile?.firstName} {profile?.lastName}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500 block">Email</label>
              <p>{profile?.email}</p>
            </div>

            {profile?.role && (
              <div>
                <label className="text-sm text-gray-500 block">Role</label>
                <p>{profile.role}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Department Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 block">
                Department Name
              </label>
              <p className="font-medium">{department?.departmentName}</p>
            </div>
            {department?.location && (
              <div>
                <label className="text-sm text-gray-500 block">Location</label>
                <p>{department.location}</p>
              </div>
            )}
            {department?.categoryName && (
              <div>
                <label className="text-sm text-gray-500 block">
                  categoryName
                </label>
                <p>{department.categoryName}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfilePage;
