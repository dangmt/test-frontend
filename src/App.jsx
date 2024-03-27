import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import AboutPage from "./pages/AboutPage";
import AddProductPage from "./pages/AddProductPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCheckSessionQuery } from "./api/authApi";
import { setUser, clearUser } from "./slice/userSlice";
import Unauthorized from "./components/Unauthorized"; // Đảm bảo đã import đúng
import PrivateRoute from "./components/PrivateRoute"; // Đường dẫn có thể khác tuỳ vào cấu trúc thư mục của bạn

function App() {
  const { data: sessionData, error, isLoading } = useCheckSessionQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      // Nếu có lỗi, giả sử phiên không hợp lệ và cần đăng xuất người dùng
      console.error("Failed to check session:", error.data.message);
      dispatch(clearUser());
    } else if (sessionData) {
      // Cập nhật trạng thái người dùng dựa trên dữ liệu phiên làm việc
      dispatch(setUser(sessionData));
    }
    // Hook này chỉ chạy một lần sau khi component mount hoặc khi sessionData hoặc error thay đổi
  }, [sessionData, error, dispatch]);
  // Nếu query chưa được khởi tạo, bạn có thể muốn hiển thị loading spinner hoặc return null
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<PrivateRoute allowedRoles={["admin", "user"]} />}>
            <Route path="/add-product" element={<AddProductPage />} />
            <Route
              path="/products/:productId/update"
              element={<UpdateProductPage />}
            />
            {/* Đặt thêm các route cần bảo vệ bên trong đây */}
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
