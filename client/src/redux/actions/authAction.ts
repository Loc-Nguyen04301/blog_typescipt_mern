import { IUserLogin, IUserRegister } from "../../utils/TypeScript";
import { postAPI } from "../../utils/FetchData";
import { AUTH, IAuthType } from "../types/authType";
import { ALERT, IAlertType } from "../types/alertType";
import { Dispatch } from "react";
import { validRegister } from "../../utils/Valid";

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

export const register =
  (userRegister: IUserRegister) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = validRegister(userRegister);

    if (check.errorLength > 0) {
      return dispatch({
        type: ALERT,
        payload: { errors: check.errorMessage },
      });
    }

    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      // Call API to register user
      const res = await postAPI("auth/register", userRegister);
      console.log(res);

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
