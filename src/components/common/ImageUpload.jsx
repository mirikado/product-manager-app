import { useRef, useState } from "react";

function ImageUpload({ onChange }) {
  const fileRef = useRef();
  const [preview, setPreview] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    onChange(file); // nếu bạn cần xử lý tiếp
  };

  return (
    <div className="space-y-2">
      {/* preview */}
      {preview && (
        <img
          src={preview}
          className="w-20 h-20 object-cover rounded-xl"
        />
      )}

      {/* hidden input */}
      <input
        type="file"
        ref={fileRef}
        accept="image/*"
        capture="environment"
        onChange={handleFile}
        className="hidden"
      />

      {/* custom button */}
      <button
        type="button"
        onClick={() => fileRef.current.click()}
        className="w-full border rounded-xl py-2 text-sm"
      >
        📷 Chọn ảnh
      </button>
    </div>
  );
}

export default ImageUpload;