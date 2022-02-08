import React from "react";
import { useDispatch } from "react-redux";
import { setUserLoading } from "src/redux/user/userReducer";

const useLoading = (loading: boolean | undefined = undefined) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setUserLoading(!!loading));
  }, [loading]);

  const startLoading = () => {
    dispatch(setUserLoading(true));
  };
  const stopLoading = () => {
    dispatch(setUserLoading(false));
  };
  return { startLoading, stopLoading };
};
export default useLoading;
