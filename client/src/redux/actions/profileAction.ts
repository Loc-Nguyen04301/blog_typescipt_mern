import React from "react";
import { ALERT, IAlertType } from "./../types/alertType";
import { IAuth } from "./../types/authType";
import { Dispatch } from "redux";

import { checkImage, imageUpload } from "../../utils/ImageUpload";

export const updateUser =
  (avatar: File, name: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType>) => {
    if (!auth.access_token || !auth.user) return;

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
      }

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };
