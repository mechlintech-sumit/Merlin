import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getContactList } from "../../redux/Actions/authAction";
import "./styles.css";
import data from "../../Utils/data";
import ModalA from "../modal/ModalA";

export default function HomePage() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [contactdata, setContactdata] = useState([]);
  const [showEvendata, setShowEvenData] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  console.log("contactdata", contactdata);

  const convertAttendanceresToreport = (results, showEvendata) => {
    let contactId = [];

    let response = [];

    results?.contacts_ids.forEach((res) => {
      if (!contactId.includes(res)) {
        contactId.push(res);
      }
    });
    // for (let i = 0; i < data.contacts_ids.length; i++) {
    //   let cont = results.contacts[data.contacts_ids[i]];
    //   let Obj = {
    //     id: cont.app_contact_ids[0],
    //     name: cont?.first_name,
    //     email: cont?.email,
    //     number: cont?.phone_number,
    //   };
    //   response.push(Obj);
    // }
    // return response;
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
      };
      response.push(obj);
    }
    return response;
  };

  useEffect(() => {
    let response = convertAttendanceresToreport(data, showEvendata);
    setContactdata(response);
  }, [showEvendata]);
  useEffect(() => {
    dispatch(getContactList());
  }, []);

  const onClose = () => {
    setModalOpen(false);
  };

  const handlbutton = () => {
    setModalOpen(true);
  };
  // const handleScroll = () => {
  //   const scrollTop = document.documentElement.scrollTop;
  //   const windowHeight = window.innerHeight;
  //   const scrollHeight = document.documentElement.scrollHeight;
  //   console.log("scrollTop windowHeight scrollHeight",scrollTop, windowHeight, scrollHeight)
  //   if (scrollTop + windowHeight >= scrollHeight - 10) {
  //    console.log("need to call api to load data")
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
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
        <button type="button" class="btn btn-secondary custom-btn btn-b">
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
      </div>
    </>
  );
}
