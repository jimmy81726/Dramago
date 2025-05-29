import { useEffect } from "react";

const Modal = ({ show, onClose, children }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => removeEventListener("keydown", handleKey);
  }, [onClose]);
  // 如果沒有 show 則不渲染,連DOM都不會生成
  if (!show) return null;
  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1000",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      // 點擊背景時關閉
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{
          background: "#fff",

          borderRadius: "0.5rem",
          minWidth: "300px",
          maxWidth: "90%",
        }}
      >
        {children}
      </div>
    </div>
  );
};
export default Modal;
