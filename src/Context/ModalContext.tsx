import React, { FC } from "react";
import {
  Backdrop,
  Dialog,
  DialogTitle,
  IconButton,
  Theme,
  DialogContent,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import HelloWorld from "src/modals/HelloWorld";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface ModalOptions  {
    hideCloseBtn?:boolean;
    hideTitle?:boolean;
}

const ModalContext = React.createContext({
  title: "",
  openModal: (title: string, data?: any, options?: ModalOptions) => {},
  closeModal: () => {},
});
export default ModalContext;

interface Props {
  allModals: { name: string; component: FC<any> }[];
}

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
        openModal: (title: string, data?: any,  options?: ModalOptions) => {
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
      <Dialog open={!!title} className={classes.root} maxWidth={"md"}>
        <DialogTitle sx={{ pr: 5 }}>
          {!options?.hideTitle && title}
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
          <Component.current data={data} closeModal={onClose} />
        </DialogContent>
      </Dialog>
      {children}
    </ModalContext.Provider>
  );
};
