import { AUTH, IAuth, IAuthType } from "../types/authType";

const authReducer = (
  state: IAuth = {
    token: "",
    user: {
      _id: "",
      name: "",
      account: "",
      password: "",
      avatar: "",
      role: "",
      type: "",
      createdAt: "",
      updatedAt: "",
    },
  },
  action: IAuthType
): IAuth => {
  switch (action.type) {
    case AUTH:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
