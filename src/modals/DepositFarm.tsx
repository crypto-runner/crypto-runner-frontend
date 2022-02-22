import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, TextField, Theme, Typography } from "@mui/material";
import useLoading from "src/hooks/useLoading";
import { useDispatch } from "react-redux";
import { notify } from "reapop";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 400,
  },
}));

interface Props {
  data: any;
  closeModal: () => {};
}

const DepositFarm: React.FC<Props> = ({ data: { pool }, closeModal }) => {
  const classes = useStyles();
  const { startLoading, stopLoading } = useLoading();
  const dispatch = useDispatch();
  const [amount, setAmount] = React.useState(0);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    startLoading();

    // let tx = await transfer(state.recipient, tokenId, state.amount);

    // if (tx && tx.status) {
    //   dispatch(
    //     notify({
    //       title: "Transfer Sucessfull",
    //       message: "Your token has been transfered to the recipient",
    //       status: "success",
    //     })
    //   );
    //   closeModal();
    //   window.location.reload();
    // } else {
    //   dispatch(
    //     notify({
    //       title: "Transfer Error",
    //       message: "There was an error transfering your token",
    //       status: "error",
    //     })
    //   );
    // }
    stopLoading();
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
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
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={4}>
              <Button size="small" variant="outlined" fullWidth style={{ height: 45 }}>
                Max
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography color="textPrimary">Available Amount: {123}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="secondary" style={{ marginTop: 20 }}>
              Deposit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default DepositFarm;
