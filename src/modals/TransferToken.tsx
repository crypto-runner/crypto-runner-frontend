import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, TextField, Theme, Typography } from "@mui/material";
import { POOL_CARD_ADDRESS } from "src/config/config";
import { useERC1155Transfer } from "@react-dapp/utils";
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

const TransferToken: React.FC<Props> = ({ data: { tokenId, max }, closeModal }) => {
  const classes = useStyles();
  const { transfer } = useERC1155Transfer(POOL_CARD_ADDRESS);
  const [state, setState] = React.useState({ recipient: "", amount: 1 });
  const { startLoading, stopLoading } = useLoading();
  const dispatch = useDispatch();

  const handleTransfer: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    startLoading();

    let tx = await transfer(state.recipient, tokenId, state.amount);

    if (tx && tx.status) {
      dispatch(
        notify({
          title: "Transfer Sucessfull",
          message: "Your token has been transfered to the recipient",
          status: "success",
        })
      );
      closeModal();
      window.location.reload();
    } else {
      dispatch(
        notify({
          title: "Transfer Error",
          message: "There was an error transfering your token",
          status: "error",
        })
      );
    }
    stopLoading();
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleTransfer}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography color="textPrimary">Recipient Address</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              color="secondary"
              required
              value={state.recipient}
              onChange={(e) => setState({ ...state, recipient: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography color="textPrimary">Max Available: {max}</Typography>
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: "flex", gap: 20 }}>
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                color="secondary"
                type="number"
                value={state.amount}
                required
                onChange={(e) =>
                  Number(e.target.value) <= max && setState({ ...state, amount: Number(e.target.value) })
                }
              />
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => setState({ ...state, amount: max })}
              >
                Max
              </Button>
            </div>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="secondary" style={{ marginTop: 20 }}>
              Transfer
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default TransferToken;
