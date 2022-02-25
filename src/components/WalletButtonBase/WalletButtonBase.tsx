import React from "react";
import { useWallet } from "@react-dapp/wallet";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { Button, CircularProgress, Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface Props {
  onClick?: any;
  className?: string;
  loading?: boolean;
  loadingText?: string;
  [key: string]: any;
}

const WalletButtonBase: React.FC<Props> = ({
  children,
  onClick,
  className,
  loading = false,
  loadingText = "Pending...",
  ...props
}) => {
  const classes = useStyles();
  const { setOpen: openWalletModal, account } = useWallet();

  const handleClick = (e: any) => {
    e.preventDefault();
    openWalletModal(true);
  };

  React.useEffect(() => {
    if (account) {
      localStorage.setItem("Allow-Wallet-Reconnect", "true");
    }
  }, [account]);

  return (
    <Button {...props} className={clsx(classes.root, className)} onClick={account && !loading ? onClick : handleClick}>
      {!account && "Connect Wallet"}
      {account && !loading && children}
      {account && loading && (
        <>
          <CircularProgress size={25} thickness={4} style={{ marginRight: 5, color: "black" }} />
          {loadingText}
        </>
      )}
    </Button>
  );
};

export default WalletButtonBase;
