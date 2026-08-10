import { getOrder } from "../services/profile.api.js";
import { setOrder, setLoading, setError } from "../profile.Slice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const useOrder = () => {
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.profile);

  const handleOrder = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getOrder();
      dispatch(setOrder(res.order));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };


  return { order, loading, error, handleOrder };
};

export default useOrder;