import React from "react";
import { makeStyles } from "@mui/styles";
import { Table, TableHead, Theme, TableRow, TableCell, TableBody, IconButton, Button } from "@mui/material";
import { Order, useBuyAnyOrder } from "@nftvillage/marketplace-sdk";
import useLoading from "src/hooks/useLoading";
import useNotify from "src/hooks/useNotify";
import { useWalletProvider } from "@react-dapp/wallet";
import { v4 as uuid } from "uuid";
import MomentDate from "src/components/MomentDate/MomentDate";
import AddressTypography from "src/components/AddressTypography/AddressTypography";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  thead: {
    fontSize: "110% !important",
    fontWeight: 600,
  },
  td: {
    color: "white !important",
  },
}));

interface Props {
  allOrders: Order[];
}

const BuyListing: React.FC<Props> = ({ allOrders }) => {
  const classes = useStyles();
  const { startLoading, stopLoading } = useLoading();
  const { notifySuccess, notifyError } = useNotify();
  const { buyOrder } = useBuyAnyOrder();
  const { account } = useWalletProvider();

  const handleBuy = async (order: Order) => {
    try {
      startLoading();
      let res = await buyOrder(order);
      stopLoading();
      if (res?.status) {
        notifySuccess("Order bought successfully");
        window.location.reload();
      } else notifyError("Error");
    } catch (error) {
      stopLoading();
      console.log(error);
      notifyError("Error");
    }
  };

  return (
    <div className={classes.root}>
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
              From
            </TableCell>
            <TableCell className={classes.thead} align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrders
            .filter((ord) => ord.order.maker !== account)
            .map((order: Order) => (
              <TableRow key={uuid()}>
                <TableCell className={classes.td} align="center">
                  {order.order.assetAmount}
                </TableCell>
                <TableCell className={classes.td} align="center">
                  {order.metadata.price}
                </TableCell>
                <TableCell className={classes.td} align="center">
                  <MomentDate date={order.createdAt} />
                </TableCell>
                <TableCell className={classes.td} align="center">
                  <AddressTypography address={order.order.maker} />
                </TableCell>
                <TableCell className={classes.td} align="center">
                  <Button variant="contained" onClick={() => handleBuy(order)}>
                    Buy
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BuyListing;
