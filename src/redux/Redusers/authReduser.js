import {
  LOG_IN,
  LOG_OUT,
  FORGOT_PASS,
  RESET_PASS,
  CHANGE_PASS,
  PROFILE_UPDATE,
  PROFILE_IMAGE,
  GET_TIME_ZONE,
  USER_GROUP,
  USER_PERMISSIONS,
  UPDATE_PROFILE,
} from "../Actions/authAction";

const InitialState = {
  isUpdateRequire: false,
  isLoggedIn: false,
  userInfo: {},
  toggle: false,
  linkSend: false,
  errorMessage: "",
  userPermissions: [],
  timeZones: [],
  userGroups: [],
  toggle: false,
};

const authReduser = (state = InitialState, action) => {
  switch (action.type) {
    case "UPDATE_REQUIRE": {
      return {
        ...state,
        isUpdateRequire: true,
      };
    }
    case LOG_IN: {
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.payload,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    case FORGOT_PASS: {
      return {
        ...state,
        isLoggedIn: false,
        userInfo: action.payload,
        linkSend: true,
      };
    }
    case RESET_PASS: {
      return {
        ...state,
        isLoggedIn: false,
        userInfo: action.payload,
      };
    }
    case CHANGE_PASS: {
      return {
        ...state,
        isLoggedIn: false,
        userInfo: action.payload,
      };
    }
    case PROFILE_UPDATE: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          profile_image: action.payload.profile_image,
        },
      };
    }
    case PROFILE_IMAGE: {
      return {
        ...state,
        profileImage: action.payload,
      };
    }
    case USER_PERMISSIONS: {
      return {
        ...state,
        userPermissions: action.payload,
      };
    }
    case UPDATE_PROFILE: {
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    }
    case USER_GROUP: {
      return {
        ...state,
        userGroups: action.payload,
      };
    }
    case GET_TIME_ZONE: {
      return {
        ...state,
        timeZones: action.payload,
      };
    }
    case "SET_ERROR_MSG": {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case "ON": {
      return {
          ...state, toggle: true
      }
  }
  case "OFF": {
      return {
          ...state, toggle: false
      }
  }
    default:
      return { ...state };
  }
};

export default authReduser;
