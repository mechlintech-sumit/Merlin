
export const HeaderToken = () => {
  let CSRFToken = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/, "$1")

  let userData = JSON.parse(localStorage.getItem("userData"));
  let token = userData.token;
  let TimeZone = userData.timezone;
  console.log("token", token);
  let config = {
    headers: {
      Authorization: `Token ${token}`,
      "X-API-TIMEZONE": TimeZone,
      "X-CSRFToken":CSRFToken
    },
  };
  return config;
};
