import { IUserLogin } from "../../utils/TypeScript";
import { postAPI } from "../../utils/FetchData";
import { AUTH, IAuthType } from "../types/authType";
import { ALERT, IAlertType } from "../types/alertType";
import { Dispatch } from "react";

export const login =
  (userLogin: IUserLogin) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      // Call API to login user
      const res = await postAPI("auth/login", userLogin);
      console.log(res);
      dispatch({
        type: AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });
      //
      dispatch({
        type: ALERT,
        payload: { loading: false, success: res.data.message },
      });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };
