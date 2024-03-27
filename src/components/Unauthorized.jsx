import React from "react";

const Unauthorized = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h1 className="mb-4">Truy cập bị từ chối</h1>
          <p className="mb-4">
            Bạn không có quyền truy cập vào trang này. Vui lòng đăng nhập với
            tài khoản có quyền truy cập hoặc liên hệ quản trị viên.
          </p>
          <a href="/login" className="btn btn-primary">
            Quay lại trang đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
