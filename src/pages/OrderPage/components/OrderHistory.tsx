import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Theme, Typography } from "@mui/material";
import Bg from "src/assets/images/orangebg.jpg";
import { HistoryOfOrder } from "@nftvillage/marketplace-sdk";
import MomentDate from "src/components/MomentDate/MomentDate"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: `url(${Bg})`,
    backgroundSize: "cover",
    paddingTop: 30,
    paddingBottom: 30,
  },
  thead: {
    fontSize: "110%",
    fontWeight: 600,
  },
  td: {
    color: "white",
  },
}));

interface Props {
  orderHistory?: HistoryOfOrder[];
}

const OrderHistory: React.FC<Props> = ({ orderHistory }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography variant="h3" className="styleFont" style={{ marginBottom: 10 }} align="center">
          <b>History</b>
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.thead} align="center">
                Amount
              </TableCell>
              <TableCell className={classes.thead} align="center">
                PRICE
              </TableCell>
              <TableCell className={classes.thead} align="center">
                FROM
              </TableCell>
              <TableCell className={classes.thead} align="center">
                TO
              </TableCell>
              <TableCell className={classes.thead} align="center">
                DATE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!orderHistory && (
              <TableRow>
                <Typography align="center" style={{ marginTop: 20 }}>
                  No Sale History
                </Typography>
              </TableRow>
            )}
            {orderHistory &&
              orderHistory.map((order, index) => (
                <TableRow key={index}>
                  <TableCell className={classes.td} align="center">
                    {order.assetAmount}
                  </TableCell>
                  <TableCell className={classes.td} align="center">
                    {order.price}
                  </TableCell>
                  <TableCell className={classes.td} align="center">
                    {order.maker}
                  </TableCell>
                  <TableCell className={classes.td} align="center">
                    {order.taker}
                  </TableCell>
                  <TableCell className={classes.td} align="center">
                    <MomentDate date={order.purchaseDate} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
};

export default OrderHistory;
