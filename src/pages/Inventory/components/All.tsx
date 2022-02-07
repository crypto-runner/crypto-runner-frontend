import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Theme, Typography } from "@mui/material";
import { useInventory } from "src/hooks/useInventory";
import { setUserLoading } from "src/redux/user/userReducer";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import { POOL_CARD_ADDRESS } from "src/config/config";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  imgContainer: {
    width: "100%",
    height: 300,
    backgroundColor: "#FFB888",
    position: "relative",
    "& img": {
      objectFit: "contain",
      width: "100%",
      height: "100%",
    },
  },

  quantityWrapper: {
    // display: "flex",
    width: "max-content",

    justifyContent: "center",
    background: "white",
    border: "2px solid black",
    padding: "2px 5px",
  },
  quantityContainer: {
    position: "absolute",
    bottom: -20,
    // left: "calc(50% - 100px)",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  quantityText: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 20,
    "& span": {
      color: theme.palette.primary.main,
    },
  },
}));

interface Props {}

const All: React.FC<Props> = () => {
  const classes = useStyles();
  const { balance, loading } = useInventory();
  const dispatch = useDispatch();
  const history = useHistory();

console.log("balance",balance);

  return (
    <Grid container spacing={3} style={{ marginTop: 20 }}>
      {balance?.map((item:any) => (
        <Grid key={uuid()} item xs={12} sm={6} md={4} lg={3}>
          <div
            style={{ position: "relative" }}
            onClick={() =>
              history.push(`/order-item/${POOL_CARD_ADDRESS}/${item.tokenId}`)
            }
          >
            <div className={classes.imgContainer}>
              <img src={item.image || item.animation_url} alt="" />
              <div className={classes.quantityContainer}>
                <div className={classes.quantityWrapper}>
                  <Typography className={classes.quantityText}>
                    {item.amount} <span>Total</span>
                  </Typography>
                </div>
              </div>
            </div>
            <Button
              color="primary"
              fullWidth
              variant="outlined"
              style={{ marginTop: 30 }}
            >
              {item.name}
            </Button>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default All;
