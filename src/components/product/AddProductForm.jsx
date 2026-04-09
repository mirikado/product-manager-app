import { useState, useEffect } from "react";
import ImageUpload from "../common/ImageUpload";

function AddProductForm({ onAddProduct, loading }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  const handleImage = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // base64 string
    };

    reader.readAsDataURL(file);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    const numericPrice = Number(price);

    if (isNaN(numericPrice)) {
      alert("Giá không hợp lệ");
      return;
    }

    const newProduct = ({
      id: Date.now(),
      name,
      price: Number(price),
      image,
    });

    onAddProduct(newProduct);

    // reset form
    setName("");
    setPrice("");
    setImage(null);
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm space-y-3">
      <input
        placeholder="Tên sản phẩm"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded-xl px-3 py-2"
      />

      <input
        type="number"
        min={0}
        placeholder="Giá"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border rounded-xl px-3 py-2"
      />

      <ImageUpload key={resetKey} onChange={handleImage}></ImageUpload>

      <button disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded-xl" onClick={handleAddProduct}>Thêm</button>
    </div>
  );
}

export default AddProductForm;