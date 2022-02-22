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
import { Order, useCancelOrder } from "@nftvillage/marketplace-sdk";
import { useWallet } from "@react-dapp/wallet";
import { v4 as uuid } from "uuid";
import useLoading from "src/hooks/useLoading";
import MomentDate from "src/components/MomentDate/MomentDate";

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
  allOrders: Order[];
}

const CurrentListing: React.FC<Props> = ({ availableAmount, tokenId, address, metadata, allOrders }) => {
  const classes = useStyles();
  const [price, setPrice] = React.useState<number>(1);
  const [assetAmount, setAssetAmount] = React.useState<number>(1);
  const { createERC1155Order, isApproved } = useCreateOrder(address);
  const [canBeListed, setCanBeListed] = React.useState(0);
  const { account } = useWallet();
  const { cancel } = useCancelOrder();
  const { startLoading, stopLoading } = useLoading();

  React.useEffect(() => {
    let totalBalance = availableAmount || 0;
    allOrders?.forEach((order) => {
      totalBalance -= order?.order?.assetAmount || 0;
    });
    setCanBeListed(totalBalance);
  }, [allOrders, availableAmount]);

  const handleAssetAmount: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
    let v = Number(e.target.value);
    if (v <= availableAmount) {
      setAssetAmount(v);
    }
  };

  const createOrder = async () => {
    if (canBeListed > 0)
      createERC1155Order({
        metadata,
        tokenId,
        assetAmount,
        price,
      });
  };

  const cancelSell = async (ord: Order) => {
    startLoading();
    if (ord) await cancel(ord);
    stopLoading();
    window.location.reload();
  };

  console.log("token amount", availableAmount);

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
            Available Tokens: <b>{canBeListed < 0 ? 0 : canBeListed}</b>
          </Typography>
          {canBeListed > 0 && (
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
              {allOrders
                .filter((ord) => ord.order.maker === account)
                .map((ord) => (
                  <TableRow key={uuid()}>
                    <TableCell className={classes.td} align="center">
                      {ord.order.assetAmount}
                    </TableCell>
                    <TableCell className={classes.td} align="center">
                      {ord.metadata.price}
                    </TableCell>
                    <TableCell className={classes.td} align="center">
                      <MomentDate date={ord.createdAt} />
                    </TableCell>
                    <TableCell className={classes.td} align="center">
                      <IconButton onClick={() => cancelSell(ord)}>
                        <DeleteOutlineIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default CurrentListing;
