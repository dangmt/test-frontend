// pages/AddProductPage.js
import React, { useState } from "react";
import { useAddProductMutation } from "../api/productsApi";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const [addProduct, { isLoading }] = useAddProductMutation();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(product).unwrap(); // Sử dụng .unwrap() để có thể bắt lỗi
      navigate("/products"); // Điều hướng đến trang sản phẩm nếu không có lỗi
    } catch (err) {
      // Xử lý khi có lỗi xảy ra, ví dụ: thông báo lỗi từ server
      console.error("Failed to add the product:", err.data.message);
      // setSubmitError(err.data ? err.data : "An error occurred while adding the product."); // Cập nhật thông điệp lỗi dựa trên lỗi trả về từ server hoặc một thông điệp mặc định
    }
  };
  return (
    <div className="container">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
