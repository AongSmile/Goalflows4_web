import React from "react";

// Shared "preview specification" modal used by both the product list and
// product detail views. Previously this exact block was copy-pasted into
// every single product component (100+ times).
const ProductSpecModal = ({ specUrl, onClose }) => {
  if (!specUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 md:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-5xl h-[85vh] relative flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="font-semibold text-[#003b6e]">Preview Specification</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        <iframe src={specUrl} title="Specification" className="w-full flex-1" />

        <div className="p-3 border-t flex justify-end">
          <a
            href={specUrl}
            download
            className="bg-[#003b6e] text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecModal;
