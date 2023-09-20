import React, { useState } from "react";
import "./styles.css";
import Modal from "../../components/common/Modal";



export default function ModalA({ open, onClose}) {


  return (
    <Modal open={open} onClose={onClose}>
      <div className="">
        <button type="button" class="btn btn-primary custom-btn btn-a">
        All Contacts
        </button>
        <button type="button" class="btn btn-secondary custom-btn btn-b">
        US Contacts
        </button>
        <button type="button" class="btn btn-secondary custom-btn btn-c text-dark" onClick={() => onClose()}>
         Close
        </button>
      </div>
    </Modal>
  );
}
