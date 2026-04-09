import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loginAsGuest } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = () => {
    if (!form.username.trim() || !form.password.trim()) return;

    const ok = login(form.username, form.password);

    if (!ok) {
      alert("Nhập đủ thông tin!");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow w-80 space-y-3">
        <h2 className="text-lg font-bold text-center">Đăng nhập</h2>

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-xl"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-xl"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-xl"
        >
          Login
        </button>
        <button
          onClick={loginAsGuest}
          className="w-full border py-2 rounded-xl"
        >
          👤 Dùng thử (Guest)
        </button>
      </div>
    </div>
  );
}