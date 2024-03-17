// src/services/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Function để lấy token từ lưu trữ trên client
const getToken = () => localStorage.getItem("token");

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "login", // Điều chỉnh tùy theo endpoint của bạn
        method: "POST",
        body: credentials,
      }),
      // Giả sử phản hồi trả về một object chứa token
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.token) {
            localStorage.setItem("token", data.token); // Lưu token vào localStorage
            localStorage.setItem("userId", data.userId); // Lưu userId vào localStorage
            localStorage.setItem("role", data.role); // Lưu role vào localStorage
          }
        } catch (error) {
          // Xử lý lỗi nếu có
        }
      },
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: "register", // Điều chỉnh tùy theo endpoint của bạn
        method: "POST",
        body: user,
      }),
    }),
    // Đăng xuất không cần gọi API, xử lý trực tiếp trong component
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
