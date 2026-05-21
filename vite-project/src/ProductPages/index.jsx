import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import "./product.css";

const formatPrice = (price) => price.toLocaleString("vi-VN") + " ₫";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="pd-status">Đang tải...</div>;
    if (error) return <div className="pd-status pd-error">{error}</div>;

    return (
        <div className="pd-page">
            <button className="pd-back" onClick={() => navigate(-1)}>← Quay lại</button>

            <div className="pd-container">
                <div className="pd-img-wrap">
                    <img src={product.image} alt={product.name} />
                </div>

                <div className="pd-info">
                    <p className="pd-brand">{product.brand}</p>
                    <h1 className="pd-name">{product.name}</h1>
                    <p className="pd-price">{formatPrice(product.price)}</p>

                    <div className="pd-specs">
                        <h2>Thông số kỹ thuật</h2>
                        <table>
                            <tbody>
                                <tr><td>CPU</td><td>{product.specs.cpu}</td></tr>
                                <tr><td>RAM</td><td>{product.specs.ram}</td></tr>
                                <tr><td>Ổ cứng</td><td>{product.specs.storage}</td></tr>
                                <tr><td>Màn hình</td><td>{product.specs.screen}</td></tr>
                                <tr><td>GPU</td><td>{product.specs.gpu}</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="pd-stock">
                        {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Hết hàng"}
                    </p>

                    <button className="pd-btn-cart">Thêm vào giỏ hàng</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;