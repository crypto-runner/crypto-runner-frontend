import React, { FC } from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  Theme,
  DialogContent,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import SuccessPng from "./checked.png";
import ErrorPng from "./error.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  typeDiv: {
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    flexFlow: "column",
  },
}));

interface ModalOptions {
  hideCloseBtn?: boolean;
  hideTitle?: boolean;
  type?: "success" | "error";
}

const ModalContext = React.createContext({
  title: "",
  /**
   * 
   * This function opens the modal of given title with given options
   * @param title unique title of the modal 
   * @param data data to be passed to modal component
   * @param options options to be passed to modal component
   */
  openModal: (title: string, data?: any, options?: ModalOptions) => {},
  closeModal: () => {},
});
export default ModalContext;

interface Props {
  allModals: { name: string; component: FC<any> }[];
}

const typePaperStyles = { width: "100vw", maxWidth: 500 };

export const ModalProvider: React.FC<Props> = ({ children, allModals }) => {
  const classes = useStyles();
  const [title, setTitle] = React.useState("");
  const [options, setOptions] = React.useState<ModalOptions | undefined>({});
  const [data, setData] = React.useState({});
  const Component = React.useRef<any>(undefined);

  const onClose = () => {
    setTitle("");
    setData({});
  };

  return (
    <ModalContext.Provider
      value={{
        title,
        openModal: (title: string, data?: any, options?: ModalOptions) => {
          Component.current = allModals?.find(
            (x) => x.name === title
          )?.component;
          setTitle(title);
          setData(data);
          setOptions(options);
        },
        closeModal: onClose,
      }}
    >
      <Dialog
        open={!!title}
        className={classes.root}
        maxWidth={"md"}
        PaperProps={{ style: options?.type ? typePaperStyles : {} }}
      >
        <DialogTitle sx={{ pr: 5 }}>
          {!(options?.hideTitle || options?.type) && title}
          {!options?.hideCloseBtn ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
              size="small"
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.primary.main,
                background: "none",
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>

        <DialogContent>
          {!options?.type && (
            <Component.current data={data} closeModal={onClose} />
          )}
          {options?.type === "success" && (
            <div className={classes.typeDiv}>
              <img src={SuccessPng} alt="success" width="100px" />
              <Typography
                variant="h5"
                style={{ fontWeight: 600, marginTop: 20 }}
                align="center"
              >
                {title}
              </Typography>
            </div>
          )}
          {options?.type === "error" && (
            <div className={classes.typeDiv}>
              <img src={ErrorPng} alt="error" width="100px" />
              <Typography
                variant="h5"
                style={{ fontWeight: 600, marginTop: 20 }}
                align="center"
              >
                {title}
              </Typography>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {children}
    </ModalContext.Provider>
  );
};
