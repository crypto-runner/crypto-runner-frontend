import React from "react";
import { useWallet } from "@react-dapp/wallet";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { Button, Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface Props {
  onClick?: any;
  className?: string;
  [key: string]: any;
}

const WalletButtonBase: React.FC<Props> = ({ children, onClick, className, ...props }) => {
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
    <Button {...props} className={clsx(classes.root, className)} onClick={account ? onClick : handleClick}>
      {account ? children : "Connect Wallet"}
    </Button>
  );
};

export default WalletButtonBase;
