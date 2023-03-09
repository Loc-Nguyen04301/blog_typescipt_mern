import axios from "axios";

export const postAPI = async (url: string, data: object, token?: string) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/${url}`,
    data,
    {
      headers: { Authorization: token },
    }
  );

  return res;
};

export const getAPI = async (url: string, token?: string) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/${url}`,
    {
      headers: { Authorization: token },
    }
  );
  return res;
};
