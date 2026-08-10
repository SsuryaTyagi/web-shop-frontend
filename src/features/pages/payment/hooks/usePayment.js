import {createOrder, verifyPayment, saveOrder} from "../services/payment.api";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError, setMessage } from "../payment.Slice";
import { toast } from "react-toastify";


export const usePayment = ()=>{
    const dispatch = useDispatch();
    const {loading, error, message} = useSelector((state)=> state.payment);

    const handleCreateOrder = async (orderData)=>{
        try {
            dispatch(setLoading(true));
            const order = await createOrder(orderData);
            dispatch(setCurrentOrder(order));
            toast.success(order.message, {toastId: "create-order-success"});
        } catch (error) {
            dispatch(setError(error.message));
            toast.error(error.message, {toastId: "create-order-error"});
        } finally {
            dispatch(setLoading(false));
        }
    }
    const handle

}