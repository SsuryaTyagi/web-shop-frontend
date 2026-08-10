import {createOrder, verifyPayment, saveOrder} from "../services/payment.api";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError, setMessage } from "../payment.Slice";
import { toast } from "react-toastify";


export const usePayment = ()=>{
    const dispatch = useDispatch();
    const {loading, error, message} = useSelector((state)=> state.payment);

    const handleCreateOrder = async (amount)=>{
        try {
            dispatch(setLoading(true));
            const order = await createOrder(amount);
            dispatch(setCurrentOrder(order));
            toast.success("Order created successfully", {toastId: "create-order-success"});
        } catch (error) {
            dispatch(setError(error.message));
            toast.error(error.message, {toastId: "create-order-error"});
        } finally {
            dispatch(setLoading(false));
        }
    }
    const handleVerifyPayment = async (paymentData)=>{
        try{
            dispatch(setLoading(true));
            const verificationResult = await verifyPayment(paymentData);
            toast.success(verificationResult.message, {toastId: "verify-payment-success"});
        }catch(error){
            dispatch(setError(error.message));
            toast.error(error.message, {toastId: "verify-payment-error"});
        } finally {
            dispatch(setLoading(false));
        }

    }
}