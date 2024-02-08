import { validPhoneNumber } from "./../../utils/Valid";
import { IUserLogin, IUserRegister } from "../../utils/TypeScript";
import { postAPI, getAPI } from "../../utils/FetchData";
import { AUTH, IAuthType } from "../types/authType";
import { ALERT, IAlertType } from "../types/alertType";
import { Dispatch } from "redux";
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
          access_token: res.data.access_token,
          user: res.data.user,
        },
      });

      dispatch({
        type: ALERT,
        payload: { loading: false, success: res.data.message },
      });

      localStorage.setItem("logged", "true");
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
      // Call API to active user
      // const { active_token } = res.data;
      // await postAPI("auth/active", active_token);

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

export const refreshToken =
  () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const logged = localStorage.getItem("logged");
    if (logged !== "true") return;

    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getAPI("auth/refresh_token");

      dispatch({ type: AUTH, payload: res.data });

      dispatch({ type: ALERT, payload: {} });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };

export const logout =
  () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      localStorage.removeItem("logged");
      const res = await getAPI("auth/logout");
      console.log(res);
      window.location.href = "/";
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };

export const loginSMS =
  (phone: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = validPhoneNumber(phone);

    if (!check)
      return dispatch({
        type: ALERT,
        payload: { errors: "Format Phone is incorrect" },
      });
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await postAPI("auth/login_sms", { phone });
      console.log(res);
      // CALL API 2th time
      // if (!res.data.valid) verifySMS(phone, dispatch);

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };

// export const verifySMS = async (
//   phone: string,
//   dispatch: Dispatch<IAuthType | IAlertType>
// ) => {
//   const code = prompt("Enter your code");
//   if (!code) return;

//   try {
//     dispatch({ type: ALERT, payload: { loading: true } });

//     const res = await postAPI("auth/sms_verify", { phone, code });
//     console.log(res);
//     dispatch({ type: AUTH, payload: res.data });

//     dispatch({ type: ALERT, payload: { success: res.data.message } });

//     localStorage.setItem("logged", "true");
//   } catch (error: any) {
//     dispatch({ type: ALERT, payload: { errors: error.response.data.message } });
//   }
// };
