import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const { isLoggedIn, role, isLoading } = useSelector((state) => state.user);

  // Kiểm tra xem người dùng đã đăng nhập và có vai trò phù hợp không
  const isAuthenticated = isLoggedIn && allowedRoles.includes(role);
  // Kiểm tra nếu người dùng đã đăng nhập nhưng không có vai trò phù hợp
  const isAuthorized = isLoggedIn && !allowedRoles.includes(role);
  console.log(isLoading, isLoggedIn, role);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  //   return "hello";
  if (isAuthenticated) {
    return <Outlet />; // Nếu xác thực và ủy quyền, hiển thị nội dung của route
  } else if (isAuthorized) {
    return <Navigate to="/unauthorized" replace />; // Nếu đã đăng nhập nhưng không ủy quyền, chuyển hướng đến trang "Unauthorized"
  } else {
    return <Navigate to="/login" replace />; // Nếu chưa đăng nhập, chuyển hướng đến trang "Login"
  }
};

export default PrivateRoute;
