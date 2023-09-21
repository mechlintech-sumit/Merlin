import { Axios } from "../../Utils/axios";
import { HeaderToken } from "../../Utils/headerToken";
export const CONTACT_LIST = "CONTACT_LIST";

export const getContactList = (searchValue) => {
  return async (dispatch) => {
    Axios.get(
      `/contacts.json?companyId=171&page=1${
        searchValue ? `&query=${searchValue}` : ""
      }`,
      HeaderToken()
    )
      .then((res) => {
        dispatch({ type: CONTACT_LIST, payload: res.data });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
};
