import { Axios } from "../../Utils/axios";
import { toast } from "react-toastify";
import { HeaderToken } from "../../Utils/headerToken";
export const CONTACT_LIST = "CONTACT_LIST";


export const getContactList = () => {
  return async (dispatch) => {
    await Axios.get(`/contacts.json?companyId=171`, HeaderToken())
      .then((res) => {
        dispatch({ type: CONTACT_LIST, payload: res.data });
      })
      .catch((err) => {
             toast.error("Network Error");
      });
  };
};

