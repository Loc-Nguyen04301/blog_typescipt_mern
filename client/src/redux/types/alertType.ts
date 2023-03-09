export const ALERT = "ALERT";

export interface IAlert {
  loading?: boolean;
  success?: string | string[];
  errors?: string | string[];
}

export interface IAlertType {
  type: typeof ALERT;
  payload: IAlert;
}
