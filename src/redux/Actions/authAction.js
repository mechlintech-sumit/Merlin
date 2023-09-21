import { Axios } from "../../Utils/axios";
import { HeaderToken } from "../../Utils/headerToken";
export const CONTACT_LIST = "CONTACT_LIST";

const convertAttendanceresToreport = (results) => {
  let users = [];

  let oldRepResponse = [];

  results?.forEach((res) => {
    if (!users.includes(res.user)) {
      users.push(res.user);
    }
  });

  if (users.length > 0) {
    users.forEach((user) => {
      let userAllData = results.filter((data) => data.user === user);

      let list_of_days = userAllData.map((data) => ({
        current_date: data.date,
        shift_start_time: data.shift_start,
        actual_start_time: data.actual_shift_start,
        actual_hours_worked_within_shift: data.hours_worked_within_shift,
        total_hours_worked: data.total_hours_worked,
        over_time: data.overtime,
        status: data.status,
      }));

      let userObj = {
        id: userAllData[0].user_details.id,
        name: userAllData[0].user_details.name,
        email: userAllData[0].user_details.email,
        profile_image: userAllData[0].user_details.profile_image,
        attendance: {
          list_of_days: list_of_days,
        },
      };

      oldRepResponse.push(userObj);

      console.log({ userAllData, userObj });
    });
  }

  return oldRepResponse;
};


export const getContactList = () => {
  return async (dispatch) => {
    await Axios.get(`/contacts.json?companyId=171&page=1`, HeaderToken())
      .then((res) => {
        dispatch({ type: CONTACT_LIST, payload: res.data });
      })
      .catch((err) => {
           console.log("err",err)
      });
  };
};

