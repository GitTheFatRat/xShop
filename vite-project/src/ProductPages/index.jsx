import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { isFavorite, toggleFavorite } from "../favorites";
import "./product.css";

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + " ₫";
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Không thể tải dữ liệu");
        return res.json();
      })
      .then((data) => {
        const found = data.find((p) => p.id === id);
        if (!found) throw new Error("Không tìm thấy sản phẩm");
        setProduct(found);
        setLiked(isFavorite(id));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  function handleFavoriteClick() {
    const nowLiked = toggleFavorite(id);
    setLiked(nowLiked);
  }

  if (loading) return <div className="pd-status">Đang tải...</div>;
  if (error) return <div className="pd-status pd-error">{error}</div>;

  return (
    <div className="pd-page">
      <button type="button" className="pd-back" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>

      <div className="pd-container">
        <div className="pd-img-block">
          <div className="pd-img-wrap">
            <img src={product.image} alt={product.name} />
          </div>

          <button
            type="button"
            className="pd-btn-favorite"
            onClick={handleFavoriteClick}
          >
            {liked ? "🤍" : "❤️"}
          </button>
        </div>

        <div className="pd-info">
          <p className="pd-brand">{product.brand}</p>
          <h1 className="pd-name">{product.name}</h1>
          <p className="pd-price">{formatPrice(product.price)}</p>

          <div className="pd-specs">
            <h2>Thông số kỹ thuật</h2>
            <table>
              <tbody>
                <tr>
                  <td>CPU</td>
                  <td>{product.specs.cpu}</td>
                </tr>
                <tr>
                  <td>RAM</td>
                  <td>{product.specs.ram}</td>
                </tr>
                <tr>
                  <td>Ổ cứng</td>
                  <td>{product.specs.storage}</td>
                </tr>
                <tr>
                  <td>Màn hình</td>
                  <td>{product.specs.screen}</td>
                </tr>
                <tr>
                  <td>GPU</td>
                  <td>{product.specs.gpu}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="pd-stock">
            {product.stock > 0
              ? `Còn ${product.stock} sản phẩm`
              : "Hết hàng"}
          </p>

          <button type="button" className="pd-btn-cart">
            Thêm vào giỏ hàng
          </button>
          <button type="button" className="pd-btn-buy">
            Mua
          </button>
        </div>
      </div>
    </div>
  );
}