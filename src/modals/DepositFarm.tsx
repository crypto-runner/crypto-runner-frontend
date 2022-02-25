import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, TextField, Theme, Typography } from "@mui/material";
import useLoading from "src/hooks/useLoading";
import { useDispatch } from "react-redux";
import { notify } from "reapop";
import { usePool } from "@nftvillage/farms-sdk";
import WalletButtonBase from "src/components/WalletButtonBase/WalletButtonBase";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 400,
  },
}));

interface Props {
  data: any;
  closeModal: () => {};
}

const DepositFarm: React.FC<Props> = ({ data: { poolId, requiredCard }, closeModal }) => {
  const classes = useStyles();
  const { startLoading, stopLoading } = useLoading();
  const handlerError = (message: string) => console.log(message);
  const pool = usePool(poolId, handlerError);

  // const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
  //   e.preventDefault();
  //   startLoading();

  //   // let tx = await transfer(state.recipient, tokenId, state.amount);

  //   // if (tx && tx.status) {
  //   //   dispatch(
  //   //     notify({
  //   //       title: "Transfer Sucessfull",
  //   //       message: "Your token has been transfered to the recipient",
  //   //       status: "success",
  //   //     })
  //   //   );
  //   //   closeModal();
  //   //   window.location.reload();
  //   // } else {
  //   //   dispatch(
  //   //     notify({
  //   //       title: "Transfer Error",
  //   //       message: "There was an error transfering your token",
  //   //       status: "error",
  //   //     })
  //   //   );
  //   // }
  //   stopLoading();
  // };

  const handleSubmit = () => {
    if (!pool?.depositInfo.pending) {
      pool?.depositInfo.deposit(undefined, undefined, undefined, undefined, requiredCard, undefined);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography color="textPrimary">Deposit Amount</Typography>
        </Grid>
        <Grid item container spacing={2} xs={12}>
          <Grid item xs={8}>
            <TextField
              size="small"
              fullWidth
              type="number"
              variant="outlined"
              color="secondary"
              required
              value={pool?.depositInfo.input.value}
              onChange={(e) => pool?.depositInfo.input.setValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              size="small"
              variant="outlined"
              fullWidth
              style={{ height: 45 }}
              onClick={() => pool?.depositInfo.input.selectMaxValue()}
            >
              Max
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography color="textPrimary">
            Available Amount: {pool?.stakedTokenBalance} {pool?.stakedTokenSymbol}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <WalletButtonBase
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            style={{ marginTop: 20 }}
            onClick={handleSubmit}
            loading={pool?.depositInfo.pending}
          >
            DEPOSIT
          </WalletButtonBase>
        </Grid>
      </Grid>
    </div>
  );
};

export default DepositFarm;
