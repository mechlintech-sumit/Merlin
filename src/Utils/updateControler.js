import { logOut } from "../redux/Actions/authAction";

export const useSiteUpdatehandler = (res, dispatch) => {
  if (res.data?.update_avaiable?.updated_required) {
    dispatch({ type: "UPDATE_REQUIRE" });
  }
};

export const autoLogoutOnTokenExpire = (err, dispatch) => {
  console.log(err)
  if (err.response.statusText === "Unauthorized") {
    dispatch(logOut());
  }
  if ((err.response.status === 401 || err.response.status === 403  )) {
    dispatch(logOut());
  }
};
