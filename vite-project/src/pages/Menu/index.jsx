import { useEffect, useState } from "react";
import "./Menu.css";
import logoImg from "../../assets/xshoplogo-header.png";

const formatPrice = (price) => price.toLocaleString("vi-VN") + " ₫";

function Menu() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                <div className="logo">
                    <img src={logoImg} alt="Xshop Logo" />
                </div>

                <div className="search-box">
                    <div className="search-box-inner">
                        <span>Search</span>
                    </div>
                </div>
            </div>

            <nav className="navbar">
                {["Home", "Yêu thích", "Giỏ hàng", "Cài đặt"].map((label) => (
                    <span key={label} className="nav-item">{label}</span>
                ))}
            </nav>

            {loading && <div className="status-msg">Đang tải dữ liệu...</div>}
            {error && <div className="status-msg error">Lỗi: {error}</div>}

            {!loading && !error && (
                <div className="product-grid">
                    {products.map((p) => (
                        <div key={p.id} className="product-card">
                            <div className="card-img-wrap">
                                <img src={p.image} alt={p.name} />
                            </div>
                            <div className="card-name">{p.name}</div>
                            <div className="card-price">{formatPrice(p.price)}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Menu;