import { Contact } from "../services/constect.Api";
import { setMessage, setError, setLoading, setSuccess } from "../contact.Slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useContect() {
  const dispatch = useDispatch();
  const { message, success, loading, error } = useSelector(
    (state) => state.contact,
  );

  const handleContact = async (userInfo) => {
    try {
      dispatch(setLoading(true));
      const res = await Contact(userInfo);
      dispatch(setMessage(res.message));
      dispatch(setSuccess(res.success));
      toast.success(res.message, { toastId: "contact-success" });
    } catch (error) {
      const errMsg =
        error?.response?.data?.message || error?.message || "Contact failed";
      dispatch(setError(errMsg));
      toast.error(errMsg, { toastId: "contact-error" });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleContact,
    message,
    error,
    loading,
    success,
  };
}
