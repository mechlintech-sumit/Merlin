import React, { useEffect } from "react";
import SearchInput from "../../components/common/SearchInput";

function ModalA({
  open,
  onClose,
  contactdata,
  setShowEvenData,
  showEvendata,
  searchValue,
  setSearchValue,
}) {

  const handleScroll = () => {
    const container = document.querySelector(".modal-body");
    const scrollTop = container.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = container.scrollHeight;
    console.log("scrollTop windowHeight scrollHeight",scrollTop, windowHeight, scrollHeight)
    if (scrollTop + windowHeight >= scrollHeight - 50) {
     console.log("need to call api to load data")
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
  return (
    <>
      <div
        className={`modal fade ${open ? "show" : ""}`}
        style={{ display: open ? "block" : "none" }}
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable custom-table">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">All Contacts</h5>
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
                  </tr>
                </thead>
                <tbody>
                  {contactdata.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name || "N/A"}</td>
                      <td>{item.email || "N/A"}</td>
                      <td>{item.number}</td>
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
    </>
  );
}

export default ModalA;
