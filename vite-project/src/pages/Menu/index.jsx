import { useEffect, useState } from "react";
import { Link } from "react-router";
import logoImg from "../../assets/xshoplogo-header.png";
import "./Menu.css";

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + " ₫";
}

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Không thể tải dữ liệu");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="header">
        <div className="menu-logo">
          <img src={logoImg} alt="Xshop Logo" />
        </div>

        <div className="search-wrap">
          <input
            className="search-input"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="header-right" />
      </div>

      <nav className="navbar">
        {["Home", "Yêu thích", "Giỏ hàng", "Cài đặt"].map((label) => (
          <span key={label} className="nav-item">
            {label}
          </span>
        ))}
      </nav>

      {loading && <div className="status-msg">Đang tải dữ liệu...</div>}
      {error && <div className="status-msg error">Lỗi: {error}</div>}

      {!loading && !error && (
        <div className="product-grid">
          {products.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="product-card"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card-img-wrap">
                <img src={p.image} alt={p.name} />
              </div>
              <div className="card-name">{p.name}</div>
              <div className="card-price">{formatPrice(p.price)}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}   

const navItems = [
  { label: "Home", to: "/mainhome" },
  { label: "Yêu thích", to: "/yeu-thich" },
  { label: "Giỏ hàng", to: "/mainhome" },
  { label: "Cài đặt", to: "/mainhome" },
];

<nav className="navbar">
  {navItems.map((item) => (
    <Link key={item.label} to={item.to} className="nav-item" style={{ textDecoration: "none", color: "inherit" }}>
      {item.label}
    </Link>
  ))}
</nav>