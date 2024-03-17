import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../api/productsApi";

function ProductDetailPage() {
  const { productId } = useParams();
  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);

  if (isLoading)
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error.toString()}
      </div>
    );

  return (
    <div className="container mt-4">
      <h2>Product Details</h2>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{product.name}</h3>
          <p className="card-text">{product.description}</p>
          <p className="fw-bold">
            Price: <span className="text-danger">${product.price}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
