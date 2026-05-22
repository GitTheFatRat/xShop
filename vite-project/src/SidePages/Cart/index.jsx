import { useNavigate } from "react-router";
import "./cart.css";

const formatPrice = (price) => price.toLocaleString("vi-VN") + " ₫";

export default function Cart({ items, removeFromCart, updateQuantity, clearCart }) {
    const navigate = useNavigate();

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <button className="cart-back" onClick={() => navigate(-1)}>
                ← Quay lại
            </button>

            <h1 className="cart-title">Giỏ hàng</h1>

            {items.length === 0 ? (
                <p className="cart-empty">Giỏ hàng trống.</p>
            ) : (
                <>
                    <div className="cart-list">
                        {items.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item__img" />

                                <div className="cart-item__info">
                                    <p className="cart-item__name">{item.name}</p>
                                    <p className="cart-item__price">{formatPrice(item.price)}</p>
                                </div>

                                <div className="cart-item__qty">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>

                                <p className="cart-item__subtotal">
                                    {formatPrice(item.price * item.quantity)}
                                </p>

                                <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-footer">
                        <button className="cart-clear" onClick={clearCart}>
                            Xóa tất cả
                        </button>
                        <div className="cart-total">
                            <span>Tổng cộng</span>
                            <span className="cart-total__price">{formatPrice(total)}</span>
                        </div>
                        <button className="cart-checkout">Thanh toán</button>
                    </div>
                </>
            )}
        </div>
    );
}