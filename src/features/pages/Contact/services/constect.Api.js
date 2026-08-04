import { BASE_URL } from "../../../Api";
import axios from "axios"

 export const Contact = async (userInfo) => {
      const res = await axios.post(`${BASE_URL}/contact`, userInfo, {
        withCredentials: true,
      });
      return res.data;
  };