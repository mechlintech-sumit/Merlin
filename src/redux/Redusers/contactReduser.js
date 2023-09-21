import { CONTACT_LIST } from "../Actions/contactAction";

const InitialState = {
  contact: [],
};

const authReduser = (state = InitialState, action) => {
  switch (action.type) {
    case CONTACT_LIST: {
      return {
        ...state,
        contact: action.payload,
      };
    }

    default:
      return { ...state };
  }
};

export default authReduser;
