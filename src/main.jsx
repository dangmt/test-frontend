import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot từ react-dom/client
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./store";

const container = document.getElementById("root"); // Lấy element có id là 'root'
const root = createRoot(container); // Tạo một root từ container

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
