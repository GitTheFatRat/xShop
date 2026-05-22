import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getFavoriteIds } from "../../favorites";
import "./yeuthich.css";

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + " ₫";
}

export default function YeuThich() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favoriteIds = getFavoriteIds();

    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const list = data.filter((p) => favoriteIds.includes(p.id));
        setProducts(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="yt-page">
      <button type="button" className="yt-back" onClick={() => navigate("/mainhome")}>
        ← Quay lại
      </button>

      <h1 className="yt-title">Yêu thích</h1>

      {loading && <p className="yt-msg">Đang tải...</p>}

      {!loading && products.length === 0 && (
        <p className="yt-msg">Chưa có sản phẩm yêu thích.</p>
      )}

      {!loading && products.length > 0 && (
        <div className="yt-grid">
          {products.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="yt-card"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={p.image} alt={p.name} />
              <p className="yt-name">{p.name}</p>
              <p className="yt-price">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}