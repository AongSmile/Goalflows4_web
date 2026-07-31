import React, { useState } from "react";
import { uploadImage } from "../../api/adminApi";

// A text input for an image URL, plus an optional "upload" button that
// sends the file to Cloudinary (via the server's /api/images endpoint) and
// fills the field with the returned secure_url.
const ImageField = ({ label, value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const result = await uploadImage(reader.result);
          onChange(result.secure_url);
        } catch (err) {
          setError(err.message || "Upload failed");
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err.message || "Upload failed");
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="วาง URL รูปภาพ หรืออัปโหลด"
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003b6e]"
        />
        <label className="shrink-0 text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer">
          {uploading ? "กำลังอัปโหลด..." : "อัปโหลด"}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </label>
      </div>
      {value && (
        <img src={value} alt="" className="mt-2 h-20 object-contain rounded border" />
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default ImageField;
