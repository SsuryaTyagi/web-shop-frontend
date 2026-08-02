import {
  fetchMenu,
  fetchMenuItem,
  fetchPopular,
} from "../services/menu.service";
import {
  setData,
  setLoading,
  setError,
  setMenuItem,
  setPopularItem,
} from "../menu.Slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const useMenu = () => {
  const dispatch = useDispatch();
  const { menuItem, popularItem, data, loading, error } = useSelector(
    (state) => state.menu,
  );

  const handleMenu = async (category) => {
    try {
      dispatch(setLoading(true));
      const res = await fetchMenu(category);
      dispatch(setData(res));
    } catch (error) {
      dispatch(setError(error.message || "Something went wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleMenuItem = async () => {
    try {
      dispatch(setLoading(true));
      const res = await fetchMenuItem();
      dispatch(setMenuItem(res));
    } catch (error) {
      dispatch(setError(error.message || "Something went wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handlePopularItem = async (popular) => {
    try {
      dispatch(setLoading(true));
      const res = await fetchPopular(popular);
      dispatch(setPopularItem(res));
    } catch (error) {
      dispatch(setError(error.message || "Something went wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    handleMenuItem();
  }, []);

  return {
    data,
    popularItem,
    menuItem,
    loading,
    error,
    handleMenu,
    handlePopularItem,
  };
};
