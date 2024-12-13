import React, { useState } from "react";
import apiClient from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setIsLoggedIn }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  const handleSubmit = async () => {
    const payload = { email, password };

    try {
      const res = await apiClient.post("auth/login", payload);
      console.log("Successful", res);
      localStorage.setItem("token", JSON.stringify(res.data.access_token));

      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-sky-200 space-y-4 p-5 rounded-md shadow-md m-10 w-64 ">
        <p className="font-semibold text-lg text-center">Login Page</p>
        <div>
          <p>Email</p>
          <input
            onChange={handleEmailChange}
            type="email"
            className="border rounded-md shadow-md"
          />
        </div>
        <div>
          <p>Password</p>
          <input
            onChange={handlePasswordChange}
            type="password"
            className="border rounded-md shadow-md"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 px-4 py-1 rounded-md shadow-md text-white"
        >
          Login
        </button>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
};

export default Login;

/*
API için Login Bilgileri
  {
  "email": "john@mail.com",
  "password": "changeme"
  }
*/
