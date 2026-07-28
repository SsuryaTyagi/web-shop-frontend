import { Menu } from "../services/menu.service";
import { setData, setLoading, setError } from "../menu.Slice";
import { useDispatch, useSelector } from "react-redux";

export const useMenu = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.menu);

  const handleMenu = async (category) => {
    try {
      dispatch(setLoading(true));
      const res = await Menu(category);
      dispatch(setData(res));
    } catch (error) {
      dispatch(setError(error));
    }finally{
        dispatch(setLoading(false))
    }
  };

  return {
    data,
    loading,
    error,
    handleMenu,
  };
};
