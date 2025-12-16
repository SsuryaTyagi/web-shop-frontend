import axios from "axios";
import { BASE_URL } from "../Components/data/Api";

export const Order = async (order) => {
  const res = await axios.post(
    `${BASE_URL + "/create"}`,
    order ,
    { withCredentials: true }
  );

  return res.data
};