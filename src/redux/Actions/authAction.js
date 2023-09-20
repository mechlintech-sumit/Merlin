import { Axios, Axios_v2 } from "../../Utils/axios";
import {
  useSiteUpdatehandler,
  autoLogoutOnTokenExpire,
} from "../../Utils/updateControler";
import { localstorage_userInfo, localStorage_userData } from "../../constants";
import { toast } from "react-toastify";
import { HeaderToken } from "../../Utils/headerToken";
import * as Sentry from "@sentry/react";
export const LOG_IN = "LOG_IN";
export const SIGN_UP = "SIGN_UP";
export const LOG_OUT = "LOG_OUT";
export const FORGOT_PASS = "FORGOT_PASS";
export const RESET_PASS = "RESET_PASS";
export const CHANGE_PASS = "CHANGE_PASS";
export const PROFILE_UPDATE = "PROFILE_UPDATE";
export const PROFILE_IMAGE = "PROFILE_IMAGE";
export const GET_TIME_ZONE = "GET_TIME_ZONE";
export const USER_GROUP = "USER_GROUP";
export const USER_PERMISSIONS = "USER_PERMISSIONS";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

export const resetPassword = (resData, token, navigate) => {
  return async (dispatch) => {
    let config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    await Axios_v2.post("auth/reset_password/", resData, config)
      .then((res) => {
        useSiteUpdatehandler(res, dispatch);
        if (res.data.status === "Success") {
          toast.success("Successfuly Password Changes");
          dispatch({ type: RESET_PASS, payload: res.data });
          navigate("/Login");
        }
        if (res.data.result === "false") {
          toast.warn(res.data.response);
        }
      })
      .catch((err) => {
        // console.log("reset res catch ",err.response)
        autoLogoutOnTokenExpire(err, dispatch);
        toast.warn(err.response.data.response);
      });
  };
};

export const forgotPassword = (useremail, setIsProcessing) => {
  let forgetData = {
    email: useremail,
    redirecturl: `${window.location.origin}/ResetPassword/`,
  };

  return async (dispatch) => {
    setIsProcessing(true);
    await Axios_v2.post("/auth/forgot_password/", forgetData)
      .then((res) => {
        useSiteUpdatehandler(res, dispatch);
        if (res.data.result === "false") {
          toast.warn("Email not exist");
        }
        if (res.data.status === "Success") {
          toast.success(
            "Reset password link sent to your email please check your mail"
          );
          dispatch({ type: FORGOT_PASS, payload: res.data });
        }
        setIsProcessing(false);
      })
      .catch((err) => {
        console.log({ error: err.response });
        autoLogoutOnTokenExpire(err, dispatch);
        toast.error(err.response.data.non_field_errors[0]);
        setIsProcessing(false);
      });
  };
};

export const logIn = (userInfo, navigate, setIsProcessing) => {
  console.log("Axios, Axios_v2",Axios, Axios_v2)
  return async (dispatch) => {
    setIsProcessing(true);
    await Axios_v2.post("/auth/login/", userInfo)
      .then((res) => {
        useSiteUpdatehandler(res, dispatch);
        if (res.data === "Email not exist") {
          toast.warn("Email not exist");
        }
        if (res.data === "password not matched") {
          toast.warn("password not matched");
        }
        if (res.data.status === "Fail") {
          dispatch({
            type: "SET_ERROR_MSG",
            payload:
              "Invalid login attempt or email not validated! Please try again.",
          });
        }
        if (res.data.status === "Success") {
          toast.success("Login Successfully");
          localStorage.setItem(
            localStorage_userData,
            JSON.stringify({
              ...res.data.data.user,
              token: res.data.data.token,
            })
          );
          Sentry.setUser({
            ...res.data.data.user,
            token: res.data.data.token,
          });
          navigate("/");
          if (userInfo.rememberMe === true) {
            localStorage.setItem(
              localstorage_userInfo,
              JSON.stringify(userInfo)
            );
          } else {
            localStorage.removeItem(localstorage_userInfo);
          }

          dispatch({
            type: LOG_IN,
            payload: {
              ...res.data.data.user,
              token: res.data.data.token,
            },
          });
          // dispatch({
          //   type: PERMISSIONS,
          //   payload: res.data.data.user.role[0].permissions.map(
          //     ({ name }) => name
          //   ),
          // });
        }
        setIsProcessing(false);
      })
      .catch((err) => {
        setIsProcessing(false);
        console.log({ error: err?.response });
        toast.warn(err.response.data.non_field_errors[0]);
        dispatch({ type: "SET_ERROR_MSG", payload: err.response.data.message });
      });
  };
};

export const signUp = (data) => {
  return (dispatch) => {
    return dispatch({
      type: SIGN_UP,
      payload: data,
    });
  };
};

export const logOut = () => {
  return (dispatch) => {
    localStorage.removeItem(localStorage_userData);
    return dispatch({
      type: LOG_OUT,
    });
  };
};

export const getTimeZone = () => {
  return async (dispatch) => {
    await Axios.get(`/TimeZones/get_common_time_zones/`, HeaderToken())
      .then((res) => {
        dispatch({ type: GET_TIME_ZONE, payload: res.data.TimeZone_Avaible });
      })
      .catch((err) => {
        autoLogoutOnTokenExpire(err, dispatch);
        //      toast.error("Network Error");
      });
  };
};
function getCookie(name) {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? cookieValue.pop() : "";
}

//hamdel api error

function handleErrorResponse(err) {
  if (err.response && err.response.data) {
    const errors = err.response.data;

    for (let key in errors) {
      if (Array.isArray(errors[key])) {
        toast.error(errors[key][0]);
      } else {
        toast.error(errors[key]);
      }
    }
  } else {
    toast.error("Something went wrong. Please try again.");
  }
}

//contect us
export const contectUsApi = (data) => {
  const csrftoken = getCookie("csrftoken");
  const headers = {
    "X-CSRFToken": csrftoken,
  };
  return async (dispatch) => {
    await Axios_v2.post(`/contact/`, data)
      .then((res) => {
        if (res.data.result === "fail") {
          toast.error(res.data.response);
        } else {
          toast.success("Your details are  added.");
        }
      })
      .catch((err) => {
        handleErrorResponse(err);
      });
  };
};

//get groups
export const getAllGroups = () => {
  return async (dispatch) => {
    await Axios_v2.get(`/groups/`, HeaderToken())
      .then((res) => {
        // console.log("res", res);
        dispatch({ type: USER_GROUP, payload: res.data.results });
      })
      .catch((err) => {
        console.log("contact err", err);
      });
  };
};

// get permissions to access
export const getPermissions = () => {
  return async (dispatch) => {
    await Axios_v2.get(`/permissions/?limit=1000000`, HeaderToken())
      .then((res) => {
        //console.log("res", res);
        if (res.status === 200) {
          dispatch({
            type: USER_PERMISSIONS,
            payload: res.data.results.map((per) => per.name),
          });
        }
      })
      .catch((err) => {
        console.log("contact err", err);
      });
  };
};

//change password

export const changePassword = (changePassData, navigation) => {
  return async (dispatch) => {
    await Axios_v2.post("/auth/change_password/", changePassData, HeaderToken())
      .then((res) => {
        console.log("res===", res.data);
        useSiteUpdatehandler(res, dispatch);
        if (res.data.result === "false") {
          toast.error(res.data.message);
        }
        if (res.data.status === "Success") {
          toast.success(res.data.message);
          dispatch({ type: CHANGE_PASS, payload: res.data });
          localStorage.removeItem(localStorage_userData);
          navigation.push("/");
          // localStorage.removeItem(localstorage_userInfo);
        }
      })
      .catch((err) => {
        autoLogoutOnTokenExpire(err, dispatch);
        console.log({ error: err.response });
        toast.error(err.response.data.current_password[0]);
      });
  };
};

export const updateProfile = (formData, ID) => {
  return async (dispatch) => {
    Axios_v2.put(`/employees/${ID}/`, formData, HeaderToken())
      .then((res) => {
        console.log("update employee res", res);
        if (res.status === 200) {
          dispatch({ type: UPDATE_PROFILE, payload: res.data });
          let localData = JSON.parse(
            localStorage.getItem(localStorage_userData)
          );
          localStorage.setItem(
            localStorage_userData,
            JSON.stringify({
              ...localData,
              ...res.data,
            })
          );
          toast.success("successfully updated");
        }
      })
      .catch((err) => {
        console.log(err);
        Object.keys(err.response.data).forEach((msg) =>
          toast.warn(`${msg} ${err.response.data[msg][0]}`)
        );

        autoLogoutOnTokenExpire(err, dispatch);
      });
  };
};

export const getTimeLog = async (req) => {
  return async (dispatch) =>
    Axios_v2.get(`/working-hour-logs/`, HeaderToken())
      .then((res) => {
        dispatch({ type: "TIMELOG_HOURS", payload: res.data });
        console.log("getTimeLog_API_RESPONSE", res.data);
      })
      .catch();
};
