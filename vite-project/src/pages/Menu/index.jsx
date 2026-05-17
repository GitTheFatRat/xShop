import { useEffect, useState } from "react";
import "./Menu.css";

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
            {/* Header */}
            <div className="header">
                <div className="logo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    Xshop
                </div>

                <div className="search-wrap">
                    <div className="search-box">
                        <span>Search</span>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <nav className="navbar">
                {["Home", "Yêu thích", "Giỏ hàng", "Cài đặt"].map((label) => (
                    <span key={label} className="nav-item">{label}</span>
                ))}
            </nav>

            {/* Nội dung */}
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