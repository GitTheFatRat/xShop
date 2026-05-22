import { useState } from "react";
import { useNavigate } from "react-router";
import "./setting.css";

const DEFAULT_AVATAR = "https://www.gravatar.com/avatar/?d=mp&s=128";

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch {
        return null;
    }
}

function saveCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const next = users.map((u) => (u.email === user.email ? user : u));
    localStorage.setItem("users", JSON.stringify(next));
}

export default function Setting() {
    const navigate = useNavigate();
    const user = getCurrentUser();

    const [info, setInfo] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });
    const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
    const [infoMsg, setInfoMsg] = useState(null);
    const [passMsg, setPassMsg] = useState(null);

    function handleInfoSave() {
        if (!info.name.trim() || !info.email.trim()) {
            setInfoMsg({ type: "error", text: "Vui lòng điền đầy đủ tên và email." });
            return;
        }
        saveCurrentUser({ ...user, name: info.name, email: info.email });
        setInfoMsg({ type: "success", text: "Đã lưu thông tin!" });
        setTimeout(() => setInfoMsg(null), 2000);
    }

    function handlePasswordSave() {
        if (!passwords.current || !passwords.next || !passwords.confirm) {
            setPassMsg({ type: "error", text: "Vui lòng điền đầy đủ." });
            return;
        }
        if (passwords.current !== user?.password) {
            setPassMsg({ type: "error", text: "Mật khẩu hiện tại không đúng." });
            return;
        }
        if (passwords.next !== passwords.confirm) {
            setPassMsg({ type: "error", text: "Mật khẩu mới không khớp." });
            return;
        }
        if (passwords.next.length < 6) {
            setPassMsg({ type: "error", text: "Mật khẩu phải ít nhất 6 ký tự." });
            return;
        }
        saveCurrentUser({ ...user, password: passwords.next });
        setPasswords({ current: "", next: "", confirm: "" });
        setPassMsg({ type: "success", text: "Đổi mật khẩu thành công!" });
        setTimeout(() => setPassMsg(null), 2000);
    }

    return (
        <div className="setting-page">
            <button className="setting-back" onClick={() => navigate(-1)}>
                ← Quay lại
            </button>

            <h1 className="setting-title">Cài đặt</h1>

            {/* ── Thông tin tài khoản ── */}
            <section className="setting-section">
                <h2>Thông tin tài khoản</h2>

                <div className="setting-avatar-row">
                    <img src={DEFAULT_AVATAR} alt="Avatar" className="setting-avatar" />
                </div>

                <div className="setting-field">
                    <label>Tên hiển thị</label>
                    <input
                        type="text"
                        placeholder="Nhập tên..."
                        value={info.name}
                        onChange={(e) => setInfo({ ...info, name: e.target.value })}
                    />
                </div>

                <div className="setting-field">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Nhập email..."
                        value={info.email}
                        onChange={(e) => setInfo({ ...info, email: e.target.value })}
                    />
                </div>

                {infoMsg && (
                    <p className={`setting-msg ${infoMsg.type === "error" ? "setting-msg--error" : "setting-msg--success"}`}>
                        {infoMsg.text}
                    </p>
                )}

                <button className="setting-save-btn" onClick={handleInfoSave}>
                    Lưu thông tin
                </button>
            </section>

            {/* ── Đổi mật khẩu ── */}
            <section className="setting-section">
                <h2>Đổi mật khẩu</h2>

                <div className="setting-field">
                    <label>Mật khẩu hiện tại</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={passwords.current}
                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    />
                </div>

                <div className="setting-field">
                    <label>Mật khẩu mới</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={passwords.next}
                        onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
                    />
                </div>

                <div className="setting-field">
                    <label>Xác nhận mật khẩu mới</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    />
                </div>

                {passMsg && (
                    <p className={`setting-msg ${passMsg.type === "error" ? "setting-msg--error" : "setting-msg--success"}`}>
                        {passMsg.text}
                    </p>
                )}

                <button className="setting-save-btn" onClick={handlePasswordSave}>
                    Đổi mật khẩu
                </button>
            </section>
        </div>
    );
}