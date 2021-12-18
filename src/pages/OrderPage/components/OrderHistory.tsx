import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
} from "@mui/material";
import Bg from "src/assets/images/orangebg.jpg";

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

interface Props {}

const OrderHistory: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.thead} align="center">
                EVENT
              </TableCell>
              <TableCell className={classes.thead} align="center">
                UNIT PRICE
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
            <TableRow>
              <TableCell className={classes.td} align="center">
                Listing
              </TableCell>
              <TableCell className={classes.td} align="center">
                200 BNB
              </TableCell>
              <TableCell className={classes.td} align="center">
                0xceeeeee
              </TableCell>
              <TableCell className={classes.td} align="center">
                -
              </TableCell>
              <TableCell className={classes.td} align="center">
                20-20-20
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </div>
  );
};

export default OrderHistory;
