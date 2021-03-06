import { SIGN_IN, SIGN_OUT } from "./types";

export default {
  auth: (state = {}, action) => {
    switch (action.type) {
      case SIGN_IN: {
        const { key, session } = action;
        return { ...state, [key]: session };
      }
      case SIGN_OUT: {
        const { keys } = action;
        const copy = { ...state };
        keys.forEach(key => {
          delete copy[key];
        });
        return copy;
      }
      default: {
        return state;
      }
    }
  }
};