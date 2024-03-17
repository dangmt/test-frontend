// src/pages/RegisterPage.js
import React, { useState } from "react";
import { useRegisterUserMutation } from "../api/authApi";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function RegisterPage() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await registerUser(userInfo).unwrap();
      console.log("Registration successful", result);
      // Điều hướng người dùng đến trang đăng nhập sau khi đăng ký thành công
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err.data.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-select"
            id="role"
            name="role"
            value={userInfo.role}
            onChange={handleChange}
            required
          >
            <option value="">Select a role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
