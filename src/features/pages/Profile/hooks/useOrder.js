import { getorder } from "../services/profile.api/js";
import { setOrder, setLoading, setError } from "../profile.Slice.js";
import { useDispatch, useSelector } from "react-redux";

const useOrder = async () => {
    const dispatch =  useDispatch();
    const {order, loading, error}= useSelector((state)=>state.profile)
  const hanldeOrder = () => {
    try {
        dispatch(setLoading(true))
        const res = await getorder();
        dispatch(setOrder(res));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export default useOrder
