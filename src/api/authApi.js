// src/services/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Function để lấy token từ lưu trữ trên client
const getToken = () => localStorage.getItem("token");

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include", // Quan trọng để gửi cookies
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "login", // Điều chỉnh tùy theo endpoint của bạn
        method: "POST",
        body: credentials,
      }),
      // Giả sử phản hồi trả về một object chứa token
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: "register", // Điều chỉnh tùy theo endpoint của bạn
        method: "POST",
        body: user,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
    checkSession: builder.query({
      query: () => "check-session",
    }),
    // Đăng xuất không cần gọi API, xử lý trực tiếp trong component
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useCheckSessionQuery,
} = authApi;
