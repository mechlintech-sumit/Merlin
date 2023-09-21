import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactList } from "../../redux/Actions/contactAction";
import "./styles.css";
import ModalA from "../../components/common/Modal/ModalA";
import ModalB from "../../components/common/Modal/ModalB";
import { convertdata } from "../../Utils/helper";

export default function HomePage() {
  const dispatch = useDispatch();
  const [contactdata, setContactdata] = useState([]);
  const [showEvendata, setShowEvenData] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { contact } = useSelector((state) => state.contact);
  const [modalOpenA, setModalOpenA] = useState(false);
  const [modalOpenB, setModalOpenB] = useState(false);
  const [page, setPage] = useState(1);

  const openModalA = () => {
    setModalOpenA(true);
    setModalOpenB(false);
  };

  const openModalB = () => {
    setModalOpenB(true);
    setModalOpenA(false);
  };

  useEffect(() => {
    getApidata();
  }, [searchValue, page]);

  const getApidata = () => {
    dispatch(getContactList(searchValue));
  };

  useEffect(() => {
    if (contact.length != 0) {
      let res = convertdata(contact, showEvendata);
      setContactdata(res);
    }
  }, [showEvendata, contact]);

  const onClose = () => {
    setModalOpenB(false);
    setModalOpenA(false);
  };

  const handlbutton = () => {
    setModalOpenA(true);
  };

  const handleButtonB = () => {
    setModalOpenB(true);
  };

  return (
    <>
      <div className="container">
        <button
          type="button"
          className="btn btn-primary custom-btn btn-a"
          onClick={() => handlbutton()}
        >
          Button A
        </button>
        <button
          type="button"
          className="btn btn-secondary custom-btn btn-b"
          onClick={() => handleButtonB()}
        >
          Button B
        </button>
        <ModalA
          open={modalOpenA}
          setModalOpenA={setModalOpenA}
          onClose={onClose}
          contactdata={contactdata}
          setShowEvenData={setShowEvenData}
          showEvendata={showEvendata}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          openModalB={openModalB}
          setPage={setPage}
          page={page}
          setContactdata={setContactdata}
        />

        <ModalB
          open={modalOpenB}
          setModalOpenB={setModalOpenB}
          onClose={onClose}
          contactdata={contactdata}
          setShowEvenData={setShowEvenData}
          showEvendata={showEvendata}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          openModalA={openModalA}
          setPage={setPage}
          page={page}
          setContactdata={setContactdata}
        />
      </div>
    </>
  );
}
