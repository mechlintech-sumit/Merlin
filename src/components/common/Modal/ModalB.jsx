import React, { useEffect, useState } from "react";
import SearchInput from "../SearchInput";
import DetailModal from "./DetailModal";
import ModalA from "./ModalA";
import { getContactList } from "../../../redux/Actions/contactAction";

function ModalB({
  open,
  onClose,
  contactdata,
  setShowEvenData,
  showEvendata,
  searchValue,
  setSearchValue,
  openModalA,
  page,
  setPage,
}) {
  const [modalData, setModalData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleScroll = () => {
    const container = document.querySelector(".modal-body");
    const scrollTop = container.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = container.scrollHeight;

    if (scrollTop + windowHeight !== scrollHeight - 50) {
      dispatchEvent(getContactList(page));
      setPage(page + 1);
    }
  };

  useEffect(() => {
    const container = document.querySelector(".modal-body"); // Change this to the appropriate selector
    if (!container) return; // Ensure the container exists

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleRowClick = (item) => {
    setOpenModal(true);
    setModalData(item);
  };

  const handleOpenModalA = () => {
    openModalA(); // Call the callback function to open Modal A
  };

  const nonUsContact = contactdata.filter((item) => item.origin == "US");

  return (
    <>
      <div
        className={`modal fade ${open ? "show" : ""}`}
        style={{ display: open ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable custom-table">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">US Contacts</h5>
              <div className="input-group w-50">
                <SearchInput
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-body">
              <h2>Data Table</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Number</th>
                    <th>Country</th>
                  </tr>
                </thead>
                <tbody>
                  {nonUsContact.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => {
                        handleRowClick(item);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{item.id}</td>
                      <td>{item.name || "N/A"}</td>
                      <td>{item.email || "N/A"}</td>
                      <td>{item.number}</td>
                      <td>{item.origin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer d-flex justify-content-between align-items-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                  checked={showEvendata}
                  onChange={() => setShowEvenData(!showEvendata)}
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Only even
                </label>
              </div>
              <button
                type="button"
                className="btn btn-primary custom-btn btn-a"
                onClick={() => handleOpenModalA()}
              >
                All Contacts
              </button>
              <button
                type="button"
                className="btn btn-secondary custom-btn btn-b"
              >
                US Contacts
              </button>
              <button
                type="button"
                className="btn btn-secondary custom-btn btn-c text-dark"
                onClick={() => onClose()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <ModalA
        open={open}
        onClose={onClose}
        contactdata={contactdata}
        setShowEvenData={setShowEvenData}
        showEvendata={showEvendata}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      /> */}

      <DetailModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        item={modalData}
      />
    </>
  );
}

export default ModalB;
