import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Theme, Typography } from "@mui/material";
import Confetti from "react-confetti";
// import Gif from "src/assets/gifs/presale/Jack_5.gif";
// import { getRunner } from "src/config/cards";
import { NavLink } from "react-router-dom";
import { useMetadata } from "src/hooks/useMetadata";
import { POOL_CARD_ADDRESS } from "src/config/config";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // width: 400,
    // height: 600,
  },
  gif: {
    // width: "70vw",
    // maxWidth: "400px",
    width: "100%",
    maxHeight: "60vh",
    objectFit: "contain",
    animation: "$gif 0.8s ease-in-out 1",
  },
  "@keyframes gif": {
    "0%": {
      transform: "scale(0)",
    },
    "90%": {
      transform: "scale(1.05)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
}));

interface Props {
  data: any;
  closeModal: () => {};
}
const RewardUnlock: React.FC<Props> = ({ data }) => {
  const classes = useStyles();
  const ref = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 10, height: 10 });
  const {metadata,loading} = useMetadata(POOL_CARD_ADDRESS,data)


  React.useEffect(() => {
    const handleResize = () => {
      let dt = ref?.current?.getBoundingClientRect();
      setDimensions({
        width: (dt?.width || 10) + 40,
        height: (dt?.height || 10) + 40,
      });
    };
    let interval = setInterval(handleResize, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [ref]);

  return (
    <Container maxWidth="lg" className={classes.root} ref={ref}>
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        initialVelocityY={30}
      />
      <img src={metadata?.animation_url || metadata?.image} alt="" className={classes.gif} />

      <Typography
        variant="h5"
        color="primary"
        className="styleFont"
        align="center"
      >
        <b>You've Unlocked</b>
      </Typography>
      <Typography
        variant="h2"
        color="primary"
        className="styleFont"
        align="center"
      >
        <b>{metadata?.name}</b>
      </Typography>

      {/* <Typography
        variant="h4"
        color="primary"
        className="styleFont"
        align="center"
      >
        <NavLink to='/my-runners'>View My Runner</NavLink>
      </Typography> */}
    </Container>
  );
};

export default RewardUnlock;
