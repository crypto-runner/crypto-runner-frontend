import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Tooltip, Typography } from "@mui/material";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) => ({}));

interface Props {
  date?: string;
  [key: string]: any;
}

const MomentDate: React.FC<Props> = ({ date, ...restProps }) => {
  const classes = useStyles();

  return (
    <Tooltip placement="top" arrow title={moment(date).format("MMMM Do YYYY, h:mm:ss a") || ""}>
      <Typography {...restProps}>{moment(date).fromNow()}</Typography>
    </Tooltip>
  );
};

export default MomentDate;
