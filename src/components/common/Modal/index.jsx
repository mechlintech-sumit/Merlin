import React, { useEffect, useRef } from "react";
import "./style.css";
const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50% ,-50%)",
  background: "white",
  zIndex: 1000,
  // borderRadius: "18px",
};
const OVERLAY_STYlES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export default function Modal({ open, onClose, children, className }) {
  const useOutsideCloseModal = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const modalRef = useRef(null);
  useOutsideCloseModal(modalRef);

  if (!open) return null;
  return (
    <>
      <div style={OVERLAY_STYlES} />
      <div
        className={`modal-main ${className}`}
        style={MODAL_STYLES}
        ref={modalRef}
      >
        {children}
      </div>
    </>
  );
}
