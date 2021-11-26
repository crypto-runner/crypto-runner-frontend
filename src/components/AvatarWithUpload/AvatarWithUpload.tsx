import { Avatar, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import getBase64 from "src/util/getBase64";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface Props {
  [key: string]: any;
}

const AvatarWithUpload: React.FC<Props> = ({
  defaultImg,
  disabled,
  onFile,
  ...props
}) => {
  const classes = useStyles();
  const inputRef: React.LegacyRef<HTMLInputElement> | undefined =
    React.useRef(null);
  const [src, setSrc] = React.useState(null);

  const handleChange = async (e: any) => {
    let file = e.target.files[0];
    let base64 = await getBase64(file);
    onFile(base64);
    setSrc(base64);
  };
  console.log(defaultImg, src);
  return (
    <div className={classes.root}>
      <Avatar
        src={src || defaultImg}
        onClick={() => inputRef?.current?.click()}
        {...props}
      />
      <input
        style={{ display: "none" }}
        onChange={handleChange}
        ref={inputRef}
        disabled={disabled}
        type="file"
        accept={"image/*"}
      />
    </div>
  );
};

export default AvatarWithUpload;
