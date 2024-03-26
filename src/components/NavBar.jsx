import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../api/authApi";
import { clearUser } from "../slice/userSlice"; // Đảm bảo bạn đã import action này
import { useSelector, useDispatch } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  const { isLoggedIn, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(clearUser()); // Cập nhật trạng thái người dùng trong Redux store
      navigate("/login"); // Điều hướng người dùng về trang đăng nhập
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  // Kiểm tra xem có token trong localStorage hay không để xác định trạng thái đăng nhập

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MyApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/add-product">
                  Add Product
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Đăng Nhập
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Đăng Ký
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={logout}>
                  Đăng Xuất
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
