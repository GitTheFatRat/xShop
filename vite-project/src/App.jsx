import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import ProductDetail from "./ProductPages";
import YeuThich from "./SidePages/YeuThich";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mainhome" element={<Menu />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/yeu-thich" element={<YeuThich />} />
    </Routes>
  );
}