import React from "react";

const DetailModal = ({ openModal, setOpenModal, item }) => {
  return (
    <div
      className={`modal fade ${openModal ? "show" : ""}`}
      style={{ display: openModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{item?.id}</h5>
          </div>
          <div className="modal-body">
            <div className="row mb-2 p-2">
              <div className="col-md-6 ">{"Name"}</div>
              <div className="col-md-6">
                {item?.name == "" ||
                item?.name == null ||
                item?.name == undefined
                  ? "N/A"
                  : item?.name}
              </div>
            </div>
            <div className="row mb-2 p-2">
              <div className="col-md-6 ">{"Email"}</div>
              <div className="col-md-6">
                {item?.email == "" ||
                item?.email == null ||
                item?.email == undefined
                  ? "N/A"
                  : item?.email}
              </div>
            </div>
            <div className="row mb-2 p-2">
              <div className="col-md-6 ">{"Phone"}</div>
              <div className="col-md-6"> {item.number}</div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setOpenModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
