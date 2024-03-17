import React from "react";
import { Link } from "react-router-dom";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../api/productsApi";

function ProductsPage() {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  // Giả sử `userId` và `role` được lưu trữ trong localStorage
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  const canDeleteProduct = (productOwnerId) => {
    // So sánh với userId và kiểm tra role
    return role === "admin" || userId === productOwnerId;
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId).unwrap();
      // Cập nhật UI tại đây nếu cần
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className="container mt-4">
      <h2>Products</h2>
      <div className="row">
        {products?.map((product) => (
          <div key={product._id} className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: {product.price}</p>
                <Link
                  to={`/products/${product._id}`}
                  className="btn btn-primary me-2"
                >
                  View Details
                </Link>
                {isAuthenticated() &&
                  canDeleteProduct(product.createdBy.toString()) && (
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  )}
                {isAuthenticated() &&
                  (role === "admin" ||
                    userId === product.createdBy.toString()) && (
                    <Link
                      to={`/products/${product._id}/update`}
                      className="btn btn-warning"
                    >
                      Update
                    </Link>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
