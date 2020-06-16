import produce from 'immer';

const INITIAL_STATE = { 
  data_f: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        break;
      }
      case '@appointment/CREATE_APPOINTMENT_REQUEST': {
        draft.data_f = action.payload.data;
        break;
      }
      case '@appointment/CREATE_APPOINTMENT_SUCCESS': {
        draft.profile = action.payload.profile;
        draft.data_f = action.payload.data;
        break;
      }
      default:
    }
  });
}