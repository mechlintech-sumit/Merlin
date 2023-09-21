import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactList } from "../../redux/Actions/contactAction";
import "./styles.css";
import data from "../../Utils/data";
import ModalA from "../../components/common/Modal/ModalA";
import ModalB from "../../components/common/Modal/ModalB";

export default function HomePage() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenB, setModalOpenB] = useState(false);
  const [contactdata, setContactdata] = useState([]);
  const [showEvendata, setShowEvenData] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { contact } = useSelector((state) => state.contact);

  const convertdata = (results, showEvendata) => {
    let contactId = [];

    let response = [];

    results?.contacts_ids?.forEach((res) => {
      if (!contactId.includes(res)) {
        contactId.push(res);
      }
    });

    const contactIdsToUse = showEvendata
      ? contactId.filter((id) => id % 2 === 0)
      : contactId;

    for (let i = 0; i < contactIdsToUse.length; i++) {
      let cont = results.contacts[contactIdsToUse[i]];
      let obj = {
        id: cont.app_contact_ids[0],
        name: cont?.first_name,
        email: cont?.email,
        number: cont?.phone_number,
        origin: cont?.country?.iso,
      };
      response.push(obj);
    }
    return response;
  };

  useEffect(() => {
     getApidata()
  }, [searchValue]);

  const getApidata = () => {
    dispatch(getContactList(searchValue));
  }

  useEffect(() => {
    if (contact.length != 0) {
      let res = convertdata(contact, showEvendata);
      setContactdata(res);
    }
  }, [showEvendata, contact]);

  const onClose = () => {
    setModalOpen(false);
    setModalOpenB(false);
  };

  const handlbutton = () => {
    setModalOpen(true);
  };

  const handleButtonB = () => {
    setModalOpenB(true);
  };

  return (
    <>
      <div className="container">
        <button
          type="button"
          class="btn btn-primary custom-btn btn-a"
          onClick={() => handlbutton()}
        >
          Button A
        </button>
        <button
          type="button"
          class="btn btn-secondary custom-btn btn-b"
          onClick={() => handleButtonB()}
        >
          Button B
        </button>
        <ModalA
          open={modalOpen}
          onClose={onClose}
          contactdata={contactdata}
          setShowEvenData={setShowEvenData}
          showEvendata={showEvendata}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

        <ModalB
          open={modalOpenB}
          onClose={onClose}
          contactdata={contactdata}
          setShowEvenData={setShowEvenData}
          showEvendata={showEvendata}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
      </div>
    </>
  );
}
