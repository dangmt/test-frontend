import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useHistory đã được thay thế bằng useNavigate trong react-router-dom v6
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../api/productsApi";
import { useSelector } from "react-redux";

function UpdateProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate(); // Sử dụng useNavigate thay cho useHistory
  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);
  const [updateProduct, { error: updateError }] = useUpdateProductMutation();
  const { userId, role } = useSelector((state) => state.user); // Giả sử state.auth chứa thông tin người dùng

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
      });
      if (product.createdBy.toString() !== userId && role !== "admin") {
        navigate("/unauthorized"); // Chuyển hướng nếu người dùng không phải chủ sở hữu hoặc admin
      }
    }
  }, [product, userId, role, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({ id: productId, ...formData }).unwrap();
      navigate(`/products/${productId}`); // Sử dụng navigate thay vì history.push
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Update Product</h2>
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
            value={formData.name}
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
            value={formData.description}
            onChange={handleChange}
          ></textarea>
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
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
        {updateError && (
          <div className="alert alert-danger" role="alert">
            Update failed: {updateError}
          </div>
        )}
      </form>
    </div>
  );
}

export default UpdateProductPage;
