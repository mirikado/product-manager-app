import { useState, useRef } from "react";

export default function ProductItem({ product, onDelete, onUpdateProduct, setProductToDelete }) {
  const DEFAULT_IMAGE = "https://placehold.co/100x100?text=No+Image";

  const imgSrc = product.image || DEFAULT_IMAGE;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image || DEFAULT_IMAGE);

  const fileInputRef = useRef(null);

  // Click vào ảnh → mở file dialog
  const handleImageClick = () => {
    if (isEditing) fileInputRef.current.click();
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // base64 string
    };

    reader.readAsDataURL(file);
  };

  // Khi bấm Save, gọi callback từ App để update product
  const handleSave = () => {
    if (!name.trim()) {
      alert("Tên sản phẩm không được để trống!");
      return;
    }
    if (Number(price) < 0) {
      alert("Giá phải lớn hơn 0!");
      return;
    }

    onUpdateProduct({
      ...product,
      name,
      price: Number(price),
      image: image || DEFAULT_IMAGE // default nếu rỗng
    });
    setIsEditing(false);
  };

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: 10,
        borderBottom: "1px solid #eee",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        borderRadius: 8,
        marginBottom: 10,
      }}
    >
      {isEditing ? (
        <>
          {image && <img
            src={image}
            width={60}
            height={60}
            style={{ borderRadius: 8, objectFit: "cover" }}
            onClick={handleImageClick}
          />}
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImage}
            accept="image/*"
            capture="environment"
          />
          <div style={{ flex: 1 }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên sản phẩm"
              className="w-full border rounded-xl px-3 py-2"
            />
            <div className="relative">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Giá"
                className="w-full border rounded-xl px-3 py-2"
              />
              <span className="absolute right-3 top-2.5">đ</span>
            </div>
          </div>
          <div>
            <button onClick={handleSave} className="mr-1.5">💾</button>
            <button onClick={() => setIsEditing(false)}>❌</button>
          </div>
        </>
      ) : (
        <>
          <img
            src={imgSrc}
            style={{
              width: 60,
              height: 60,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
          <div style={{ flex: 1 }}>
            <div>{product.name} - {product.price.toLocaleString("vi-VN")}đ</div>
          </div>
          <div>
            <button onClick={() => setIsEditing(true)} className="mr-1.5">✏️</button>
            <button onClick={() => setProductToDelete(product)}>❌</button>
          </div>
        </>
      )}
    </li>
  );
}