import React from "react";
import { GET_OTHER_INFO, IGetOtherInfoType } from "./../types/profileType";
import { getAPI, patchAPI } from "./../../utils/FetchData";
import { ALERT, IAlertType } from "./../types/alertType";
import { AUTH, IAuth, IAuthType } from "./../types/authType";
import { Dispatch } from "redux";

import { checkImage, imageUpload } from "../../utils/ImageUpload";
import { checkPassword } from "../../utils/Valid";

export const updateUser =
  (avatar: File, name: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if (!auth.access_token || !auth.user) return;
    // Url of image in Cloudinary
    let url = "";

    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      if (avatar) {
        const check = checkImage(avatar);
        console.log(check);
        if (check) return dispatch({ type: ALERT, payload: { errors: check } });
        // Call API upload image to Cloudinary
        const photo = await imageUpload(avatar);
        console.log(photo);
        url = photo.url;
      }

      dispatch({
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user,
            avatar: url ? url : auth.user.avatar,
            name: name ? name : auth.user.name,
          },
        },
      });
      // Call API update profile
      const res = await patchAPI(
        "user",
        {
          avatar: url ? url : auth.user.avatar,
          name: name ? name : auth.user.name,
        },
        auth.access_token
      );
      console.log(res);

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };

export const resetPassword =
  (password: string, confirmPassword: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    const check = checkPassword(password, confirmPassword);
    if (check) return dispatch({ type: ALERT, payload: { errors: check } });
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      // Call API reset Password
      const res = await patchAPI(
        "user/reset_password",
        { password },
        auth.access_token
      );
      console.log(res);
      dispatch({ type: ALERT, payload: { success: res.data.message } });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.message } });
    }
  };

export const getOtherInfo =
  (id: string) =>
  async (dispatch: Dispatch<IAlertType | IGetOtherInfoType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      // Call API get Info by ID
      const res = await getAPI(`user/${id}`);
      console.log(res);
      dispatch({ type: GET_OTHER_INFO, payload: res.data });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.message } });
    }
  };
