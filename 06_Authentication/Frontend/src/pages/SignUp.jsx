import React, { useContext, useRef, useState } from "react";
import { dataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom'
import myimg from "../assets/Image.jpeg";

const SignUp = () => {
  let file = useRef(null);

  let { serverUrl, userData, setUserData, getUserdata } = useContext(dataContext);

  let navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    backgroundImage: null,
  });

  const [frontendImage, setFrontendImage] = useState(myimg);

  function handleImage(e) {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      let image = URL.createObjectURL(selectedFile);
      setFrontendImage(image);

      setFormData({
        ...formData,
        backgroundImage: selectedFile, // append file in formData
      });
    }
  }

  const handleSignUP = async (e) => {
    e.preventDefault();

    try {
      const sendData = new FormData();

      sendData.append("firstName", formData.firstName);
      sendData.append("lastName", formData.lastName);
      sendData.append("userName", formData.userName);
      sendData.append("email", formData.email);
      sendData.append("password", formData.password);
      if (formData.backgroundImage) {
        sendData.append("profileImage", formData.backgroundImage);
      }

      await axios.post(serverUrl + "/signup", sendData, {
        withCredentials: true
      });

      await getUserdata();

      navigate("/");

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSignUP} className="space-y-4">
          <input
            type="file"
            hidden
            ref={file}
            onChange={handleImage}
          />

          {/* Image */}
          <div className="flex justify-center">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden relative border-2 border-white">
              <img
                src={frontendImage}
                alt="profile"
                className="w-full h-full object-cover"
              />

              <div
                className="w-full h-full bg-blue-900 top-0 absolute opacity-0 hover:opacity-50 cursor-pointer flex justify-center items-center text-white text-[20px] font-semibold"
                onClick={() => file.current.click()}
              >
                +
              </div>
            </div>
          </div>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            type="text"
            name="userName"
            placeholder="UserName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg cursor-pointer"
          >
            Sign Up
          </button>

          <p className="text-center text-sm mt-4">
            Do you have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;