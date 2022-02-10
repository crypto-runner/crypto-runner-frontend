import React from "react";
import { makeStyles } from "@mui/styles";
import { Table, TableHead, Theme, TableRow, TableCell , TableBody, IconButton, Button} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {Order} from "@nftvillage/marketplace-sdk"

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
    allOrders: Order[]
}

const BuyListing: React.FC<Props> = ({allOrders}) => {
  const classes = useStyles();

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
          {allOrders.map((order: Order) => (

          <TableRow>
            <TableCell className={classes.td} align="center">
            {order.order.assetAmount}
            </TableCell>
            <TableCell className={classes.td} align="center">
              {order.metadata.price}
            </TableCell>
            <TableCell className={classes.td} align="center">
              {/* @ts-ignore */}
              {order.createdAt}
            </TableCell>
            <TableCell className={classes.td} align="center">
              {order.order.maker}
            </TableCell>
            <TableCell className={classes.td} align="center">
              <Button variant="contained">
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
