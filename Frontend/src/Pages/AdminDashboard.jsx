import { useState } from "react";
import UsersTable from "../components/UsersTable";
import AddUser from "../components/AddUser";
const AdminDashboard = () => {
  const [addUser, setAddUser] = useState(false);
  const handleClose = () => {
    setAddUser(false);
  };
  return (
    <div className="relative pt-16">
      {addUser && (
        <>
          <div
            onClick={() => setAddUser(false)}
            className="min-h-screen absolute bg-black/45  w-screen z-50 top-0 flex flex-col justify-center sm:py-12"
          ></div>
          <AddUser close={handleClose} />
        </>
      )}
      <h1 className="text-center pt-5 text-5xl font-black ">Admin DashBoard</h1>
      <UsersTable />
      <div className="mt-5 w-screen flex justify-center">
      <button className="bg-blue-500 rounded-md px-4 py-2 text-white hover:bg-blue-700" onClick={() => setAddUser(true)}>ADD USER</button>

      </div>
    </div>
  );
};

export default AdminDashboard;
