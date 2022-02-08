import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Container,
  IconButton,
  Theme,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useCreateOrder from "src/hooks/useCreateOrder";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: 30,
  },
  thead: {
    fontSize: "110% !important",
    fontWeight: 600,
  },
  td: {
    color: "white !important",
  },

  priceField: {
    background: "white",
  },
}));

interface Props {
  availableAmount: number;
  address: string;
  tokenId: number;
  metadata: any;
}

const CurrentListing: React.FC<Props> = ({ availableAmount, tokenId, address, metadata }) => {
  const classes = useStyles();
  const [price, setPrice] = React.useState<number>(1);
  const [assetAmount, setAssetAmount] = React.useState<number>(1);
  const { createERC1155Order, isApproved } = useCreateOrder(address);

  const handleAssetAmount: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
    let v = Number(e.target.value);
    if (v <= availableAmount) {
      setAssetAmount(v);
    }
  };

  const createOrder = async () => {
    createERC1155Order({
      metadata,
      tokenId,
      assetAmount,
      price,
    });
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          color="primary"
          className="styleFont"
          style={{ marginBottom: 20, marginTop: 10 }}
        >
          <b>Sell Orders</b>
        </Typography>
        <Container maxWidth="sm">
          <Typography align="center" variant="h4" style={{ marginTop: 10 }} color="textSecondary">
            Available Tokens: <b>{availableAmount}</b>
          </Typography>
          {availableAmount > 0 && (
            <Grid container spacing={3} style={{ marginTop: 20 }}>
              <Grid item xs={12} sm={6}>
                <Typography color="textSecondary" variant="h6">
                  Tokens to Sale:
                </Typography>
                <TextField
                  type="number"
                  value={assetAmount}
                  onChange={handleAssetAmount}
                  variant="outlined"
                  placeholder="Asset Amount"
                  size="small"
                  fullWidth
                  className={classes.priceField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="textSecondary" variant="h6">
                  Price: BNB
                </Typography>
                <TextField
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  variant="outlined"
                  placeholder="Set Price"
                  size="small"
                  fullWidth
                  className={classes.priceField}
                />
              </Grid>
              <Grid item xs={12}>
                <div className="center">
                  <Button variant="contained" color="secondary" onClick={createOrder}>
                    Sell {!isApproved ? "(Approve)" : ""}
                  </Button>
                </div>
              </Grid>
            </Grid>
          )}
        </Container>
        <div style={{ overflow: "auto", marginTop: 40 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.thead} align="center">
                  Quantity
                </TableCell>
                <TableCell className={classes.thead} align="center">
                  Price
                </TableCell>
                <TableCell className={classes.thead} align="center">
                  Date
                </TableCell>
                <TableCell className={classes.thead} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.td} align="center">
                  5
                </TableCell>
                <TableCell className={classes.td} align="center">
                  2
                </TableCell>
                <TableCell className={classes.td} align="center">
                  27-FEB-2022
                </TableCell>
                <TableCell className={classes.td} align="center">
                  <IconButton>
                    <DeleteOutlineIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default CurrentListing;
