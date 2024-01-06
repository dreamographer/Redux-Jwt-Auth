/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { deleteUser, getUsers, editUser } from "../slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";

 
const UsersTable = () => {

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const users = useSelector(state => state.admin.users); 
  const [editedUserId, setEditedUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]); 

  const handleDeleteUser = userId => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  const handleEditUser = async (userId, updatedUserData) => {
    console.log(userId);
    dispatch(editUser({ id: userId, data: updatedUserData })).then(
      res => {console.log("edit Data", res)
      setEditedUserId(null);
      setEditedUserData({});
      dispatch(getUsers());}
    );
  };
const [searchQuery, setSearchQuery] = useState("");



  return (
    <>
      <div className="flex-col flex items-center  justify-center mt-5">
        <h1>User Management</h1>
        <div className="flex  justify-start w-screen">
          <input
            className="mx-96"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <table class="max-w-10 ">
          <thead class="bg-white border-b">
            <tr>
              <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                ID
              </th>
              <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Name
              </th>
              <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Email
              </th>
              <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users
              ?.filter(user =>
                `${user.name} ${user.email}`
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map(user => (
                <tr key={user._id} class="bg-gray-100 border-b">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <pre>{user._id}</pre>
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {editedUserId === user._id ? (
                      <input
                        type="text"
                        defaultValue={editedUserData.name || user.name}
                        onChange={e =>
                          setEditedUserData({
                            ...editedUserData,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {editedUserId === user._id ? (
                      <input
                        type="email"
                        defaultValue={editedUserData.email || user.email}
                        onChange={e =>
                          setEditedUserData({
                            ...editedUserData,
                            email: e.target.value,
                          })
                        }
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {editedUserId === user._id ? (
                      <button
                        onClick={() => handleEditUser(user._id, editedUserData)}
                        // disabled={isEditing}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          className="mr-4"
                          onClick={() => setEditedUserId(user._id)}
                          disabled={userInfo._id === user._id}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          disabled={userInfo._id === user._id}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersTable;
