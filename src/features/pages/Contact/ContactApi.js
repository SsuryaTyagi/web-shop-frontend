import { BASE_URL } from "../../data/Api";

    // Contact Api call
 export const Contact = async (userInfo) => {
    try {
      const res = await axios.post(`${BASE_URL}/contact`, userInfo, {
        withCredentials: true,
      });
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong!";
      // console.log(msg);
    }
  };