import React, { useState } from "react";
import "./styles.css";
import Modal from "../../components/common/Modal";



export default function ModalA({ open, onClose}) {


  return (
    <Modal open={open} onClose={onClose}>
      <div className="">
        <button type="button" class="btn btn-primary custom-btn">
        All Contacts
        </button>
        <button type="button" class="btn btn-secondary custom-btn">
        US Contacts
        </button>
        <button type="button" class="btn btn-secondary custom-btn" onClick={() => onClose()}>
         Close
        </button>
      </div>
    </Modal>
  );
}
