import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  // Kiểm tra xem người dùng đã đăng nhập chưa thông qua việc kiểm tra token trong localStorage
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Welcome to Our Website</h2>
      <p className="mb-4">
        This is the homepage content. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.
      </p>

      <Link to="/products" className="btn btn-primary">
        View Products
      </Link>

      {/* Các phần khác của trang */}

      {/* Call to Action section */}
      {!isLoggedIn && (
        <div className="row mt-5">
          <div className="col text-center">
            <h2>Join Us Now</h2>
            <p className="lead">
              Become a part of our community to get the latest updates and
              features.
            </p>
            <Link to="/register" className="btn btn-success btn-lg">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
