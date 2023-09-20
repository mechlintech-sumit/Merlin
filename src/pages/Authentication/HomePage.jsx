import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getContactList } from "../../redux/Actions/authAction";
import "./styles.css";
import ModalA from "./ModalA";

export default function HomePage() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getContactList());
  }, []);

  const onClose = () => {
    setModalOpen(false);
  };

  const handlbutton = () => {
    setModalOpen(true);
  };
  return (
    <>
      <div className="container">
        <button
          type="button"
          class="btn btn-primary custom-btn"
          onClick={() => handlbutton()}
        >
          Button A
        </button>
        <button type="button" class="btn btn-secondary custom-btn">
          Button B
        </button>
        <ModalA open={modalOpen} onClose={onClose} />
      </div>
    </>
  );
}

