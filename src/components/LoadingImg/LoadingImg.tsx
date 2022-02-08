import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Skeleton } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100%",
    // background:"red"
  },
}));

interface Props {
  src: string;
  alt?: string;
}

const LoadingImg: React.FC<Props> = ({ src, alt = "" }) => {
  const classes = useStyles();
  const imageRef = React.useRef<HTMLImageElement>(null);
  const [imgLoaded, setImgLoaded] = React.useState(false);

  React.useEffect(() => {
    let img = imageRef.current;
    const loadImage = () => {
      setImgLoaded(true);
    };
    img &&
      img.addEventListener("load", loadImage, {
        once: true,
      });
    return () => {
      img && img.removeEventListener("load", loadImage);
    };
  }, [imageRef.current, src]);

  return (
    <div className={classes.root}>
      <img
        src={src}
        ref={imageRef}
        width="100%"
        height={"100%"}
        // className={classes.mainImg}
        style={{ display: imgLoaded ? "initial" : "none", objectFit: "contain" }}
        alt={alt}
      />
      <div
        style={{
          //   width: "calc(100% - 20px)",
          margin: 10,
          height: "100%",
          display: imgLoaded ? "none" : "block",
          //   paddingTop: "100%",
          position: "relative",
        }}
      >
        <Skeleton
          animation="wave"
          width="100%"
          height={"100%"}
          style={{ transform: "none", position: "absolute", top: 0, left: 0 }}
        />
      </div>
    </div>
  );
};

export default LoadingImg;
