import React, { useState } from "react";
import mapmundi from "../images/mapmundi.jpg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ForgetPassword = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
    textChange: "Submit",
  });
  const { email, textChange } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: "Submitting" });
      axios
        .put(`${process.env.REACT_APP_API_URL}/password/forget`, {
          email,
        })
        .then((res) => {
          setFormData({
            ...formData,
            email: "",
          });
          toast.success(`Please check your email`);
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.error);
        });
    } else {
      toast.error("invalid email");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-700 to-gray-400 text-gray-900 flex justify-center">
      <ToastContainer />
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Forget Password
            </h1>
            <div className="w-full flex-1 mt-8 text-indigo-500">
              <form
                className="mx-auto max-w-xs relative "
                onSubmit={handleSubmit}
              >
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange("email")}
                  value={email}
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-300 w-full py-4 rounded-lg hover:bg-blue-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <i className="fas fa-sign-in-alt  w-6  -ml-2" />
                  <span className="ml-3">Submit</span>
                </button>
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2 ">
                    please enter your email and submit to recover your password
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-b from-blue-700 to-blue-100 w-full h-full text-center hidden lg:flex rounded-t-lg rounded-b-lg ">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat rounded-t"
            style={{
              backgroundImage: `url(${mapmundi})`,
            }}
          ></div>
        </div>
      </div>
      ;
    </div>
  );
};

export default ForgetPassword;
