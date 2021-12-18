import { Backdrop } from "@mui/material";
import React from "react";
import { SemipolarLoading } from "react-loadingg";
// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const LoadingContext = React.createContext({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export default LoadingContext;

export const LoadingProvider: React.FC = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        startLoading: () => setIsLoading(true),
        stopLoading: () => setIsLoading(false),
      }}
    >
      <Backdrop in={isLoading} open={isLoading} style={{ zIndex: 99999 }}>
        <SemipolarLoading size="large" color="#ffc511" />
      </Backdrop>
      {props.children}
    </LoadingContext.Provider>
  );
};
