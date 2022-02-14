import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Tooltip, Typography } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({}));

interface Props {
  address?: string;
  [key: string]: any;
}

const AddressTypography: React.FC<Props> = ({ address, ...restProps }) => {
  const classes = useStyles();

  return (
    <Tooltip placement="top" arrow title={address || ""}>
      <Typography {...restProps}>{`${address?.substring(0, 4)}...${address?.substring(
        address?.length - 4,
        address?.length
      )}`}</Typography>
    </Tooltip>
  );
};

export default AddressTypography;
