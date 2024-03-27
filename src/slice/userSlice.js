// features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    role: "",
    isLoggedIn: false, // Thêm trạng thái isLoggedIn
    isLoading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.isLoggedIn = true; // Cập nhật khi người dùng đăng nhập thành công
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.userId = "";
      state.role = "";
      state.isLoggedIn = false; // Cập nhật khi người dùng đăng xuất
      state.isLoading = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
