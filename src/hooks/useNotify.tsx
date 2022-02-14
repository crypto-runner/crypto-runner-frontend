import { useDispatch } from "react-redux";
import { notify } from "reapop";

const useNotify = () => {
  const dispatch = useDispatch();

  const notifyError = (message: string) => {
    dispatch(notify({ status: "error", message: message }));
  };
  const notifySuccess = (message: string) => {
    dispatch(notify({ status: "success", title: message }));
  };

  return { notifyError, notifySuccess };
};

export default useNotify;
