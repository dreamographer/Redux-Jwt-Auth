import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { updateUser } from "../slices/userSlice";
import { setCredentials, updateImage } from "../slices/authSlice";

const Profile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preview, setPreview] = useState();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      let imageUrl;
      if (image) {
        // Create a new FormData instance
        const formData = new FormData();
        formData.append("avatar", image);

        // Send the image to the server
        const imageResponse = await fetch(
          "http://localhost:5000/api/users/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!imageResponse.ok) {
          toast.error("Error uploading image");
          return;
        }
        setPreview("");

        // Get the URL of the uploaded image
        imageUrl = await imageResponse.text();
        // Append the image URL to the form data
        formData.append("imageUrl", imageUrl);
      }

      dispatch(updateUser({ name, password, imageUrl })).then(action => {
        if (action.meta.requestStatus === "rejected") {
          const errorMessage = "Some Error occurred";
          toast.error(errorMessage);
        } else {
          console.log(action.payload);
          dispatch(setCredentials(action.payload));
          toast.success("Credentials Updated");
        }
      });
    }
  };
  const handleFileChange = event => {
    setImage(event.target.files[0]);
    // Create a preview URL
    let reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    event.target.value = "";
  };
  const handleDelete = () => {
  dispatch(updateImage(""))
    toast.success("Profile Deleted");
  };
  const src = preview
    ? preview
    : userInfo.image
    ? "http://localhost:5000/" + userInfo.image
    : "https://avatar.iran.liara.run/public/boy?username=Ash";

  return (
    <>
      <main className="w-screen  pt-5 flex justify-center min-h-screen ">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">
              Update Profile
            </h2>
            <div className="grid max-w-2xl mx-auto mt-8">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  {src && (
                    <img
                      src={src}
                      alt="chosen"
                      className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    />
                  )}
                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <input
                      onChange={handleFileChange}
                      type="file"
                      name="avatar"
                      className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                    />

                    <button
                      onClick={handleDelete}
                      type="button"
                      className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                    >
                      Delete picture
                    </button>
                  </div>
                </div>

                <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                  <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label
                        htmlFor="fullname"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your Full name
                      </label>
                      <input
                        onChange={e => setName(e.target.value)}
                        type="text"
                        id="fullname"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Your first name"
                        defaultValue={userInfo.name}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-indigo-50 border  border-indigo-300 text-gray-400 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="your.email@mail.com"
                      required
                      value={userInfo.email}
                      readOnly
                    />
                  </div>

                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Pasword
                    </label>
                    <input
                      onChange={e => setPassword(e.target.value)}
                      type="password"
                      id="password"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Password"
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Confirm Pasword
                    </label>
                    <input
                      onChange={e => setConfirmPassword(e.target.value)}
                      type="text"
                      id="confirmPassword"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
