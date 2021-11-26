import React from "react";

import AvatarImg from "src/assets/images/6.jpg";
import PersonShipIco from "src/assets/images/personship.svg";
import AboutIco from "src/assets/images/about.svg";
import LinkIco from "src/assets/images/link.svg";
import LabelIco from "src/assets/images/label.svg";
// import ChipInput from "material-ui-chip-input";
import AvatarWithUpload from "src/components/AvatarWithUpload/AvatarWithUpload";
import { useUpdateProfile } from "src/hooks/useUser";
import { useShortUrlAvailibility } from "src/hooks/useUser";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Chip,
  Grid,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: 30,
    margin: "auto",
    marginTop: 20,
    padding: "20px 20px",
    maxWidth: 900,
    background: "white",
    borderRadius: 10,
  },
  content: {
    marginTop: 20,
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      flexFlow: "column",
      alignItems: "center",
    },
  },
  grid: {
    marginLeft: 20,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  textIcon: {
    marginRight: 10,
    color: "rgba(193,193,193,1)",
  },
  addBtn: {
    background: "#AAAAAA",
    borderRadius: 8,
    padding: "10px 20px",
    "&:hover": {
      background: "grey",
    },
  },
  chipInput: {
    border: "1px solid rgb(196,196,196)",
    borderRadius: 5,
    padding: 10,
    "& div::before": {
      display: "none !important",
    },
    "& div::after": {
      display: "none !important",
    },
  },
  avatar: {
    width: 150,
    height: 150,
    border: "1px dashed grey",
  },
  chip: {
    marginRight: 5,
  },
}));

interface Props {
  user: any;
}

const ProfileSettings: React.FC<Props> = ({ user }) => {
  const classes = useStyles();
  const { updateProfile } = useUpdateProfile();
  const { checkAvailibility } = useShortUrlAvailibility();
  const [urlAvailable, setUrlAvailable] = React.useState(false);

  const [state, setState] = React.useState<{ [key: string]: any }>({
    name: user?.name || "",
    email: user?.email || "",
    location: user?.location || "",
    shippingAddress: user?.shippingAddress || "",
    bio: user?.bio || "",
    skills: user?.skills || [],
    tools: user?.tools || [],
    website: user?.website || "",
    shortUrl: user?.shortUrl || "",
  });

  const initState = () => {
    setState({
      ...state,
      name: user?.name || "",
      email: user?.email || "",
      location: user?.location || "",
      shippingAddress: user?.shippingAddress || "",
      bio: user?.bio || "",
      skills: user?.skills || [],
      tools: user?.tools || [],
      website: user?.website || "",
      shortUrl: user?.shortUrl || "",
    });
  };

  React.useEffect(() => {
    initState();
  }, [user]);

  const handleInput = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddChip = (name: string, chip: string) => {
    console.log(name);
    setState({
      ...state,
      [name]: [...state[name], chip],
    });
  };
  const handleDeleteChip = (name: string, index: number) => {
    let all = [...state[name]];
    // delete value from array
    all.splice(index, 1);
    setState({
      ...state,
      [name]: all,
    });
  };

  const handleSubmit = (e: any) => {
    let { email, ...data } = state;
    updateProfile(data);
  };

  const handleImageChange = (base64: string) => {
    setState({
      ...state,
      profilePic: base64,
    });
  };

  const handleShortUrlBlur = async () => {
    let url = state.shortUrl;
    if (url !== user.shortUrl) {
      let isAvailable = await checkAvailibility(url);
      if (!isAvailable) {
        setUrlAvailable(true);
      } else {
        setUrlAvailable(false);
      }
    } else {
      setUrlAvailable(false);
    }
  };

  const handleChipKeyDown = (e: any, name: string) => {
    if (e.key === "Enter") {
      let value = e.target.value;
      if (value) {
        handleAddChip(name, value);
        e.target.value = "";
      }
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4">
        <b>Profile</b>
      </Typography>
      <div className={classes.content}>
        <div style={{ margin: 10, marginBottom: 20 }}>
          <AvatarWithUpload
            defaultImg={user?.profilePic || AvatarImg}
            className={classes.avatar}
            onFile={handleImageChange}
          />
        </div>
        <Grid container spacing={4} className={classes.grid}>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              label="Display Name"
              fullWidth
              value={state.name}
              name="name"
              onChange={handleInput}
              InputProps={{
                startAdornment: (
                  <PermIdentityIcon className={classes.textIcon} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              label="Email Address"
              type="email"
              disabled
              fullWidth
              value={state.email}
              name="email"
              onChange={handleInput}
              InputProps={{
                startAdornment: (
                  <MailOutlinedIcon className={classes.textIcon} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              label="Location"
              fullWidth
              value={state.location}
              name="location"
              onChange={handleInput}
              InputProps={{
                startAdornment: (
                  <RoomOutlinedIcon className={classes.textIcon} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              label="Shipping Address (optional)"
              fullWidth
              value={state.shippingAddress}
              name="shippingAddress"
              onChange={handleInput}
              InputProps={{
                startAdornment: (
                  <img
                    src={PersonShipIco}
                    alt="icon"
                    className={classes.textIcon}
                  />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              label="About Me"
              fullWidth
              value={state.bio}
              name="bio"
              onChange={handleInput}
              multiline
              rows={4}
              InputProps={{
                startAdornment: (
                  <img
                    src={AboutIco}
                    alt="icon"
                    className={classes.textIcon}
                    style={{ marginBottom: "auto" }}
                  />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              label="My skills (writing, drawing etc)"
              onKeyDown={(e) => handleChipKeyDown(e, "skills")}
              fullWidth
              InputProps={{
                startAdornment: (
                  <>
                    {state.skills.map((skill: any, index: any) => (
                      <Chip
                        key={uuid()}
                        label={skill}
                        onDelete={() => handleDeleteChip("skills", index)}
                        className={classes.chip}
                      />
                    ))}
                  </>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              label="My tools (photoshop etc, pencil)"
              onKeyDown={(e) => handleChipKeyDown(e, "tools")}
              fullWidth
              InputProps={{
                startAdornment: (
                  <>
                    {state.tools.map((tool: any, index: any) => (
                      <Chip
                        key={uuid()}
                        label={tool}
                        onDelete={() => handleDeleteChip("tools", index)}
                        className={classes.chip}
                      />
                    ))}
                  </>
                ),
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              label="Add Link"
              fullWidth
              value={state.website}
              name="website"
              onChange={handleInput}
              InputProps={{
                startAdornment: (
                  <img src={LinkIco} alt="icon" className={classes.textIcon} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="standard"
              label="Short Url"
              fullWidth
              error={urlAvailable}
              value={state.shortUrl}
              name="shortUrl"
              onBlur={handleShortUrlBlur}
              onChange={handleInput}
              InputProps={{
                startAdornment: (
                  <img src={LabelIco} alt="icon" className={classes.textIcon} />
                ),
              }}
            />
          </Grid>
          {/* <Grid item xs={12}>
              <Button variant="contained" className={classes.addBtn}>
                <AddIcon />
                &nbsp;&nbsp; Add Another
              </Button>
            </Grid> */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              disabled={urlAvailable}
              onClick={handleSubmit}
              style={{ width: 175 }}
            >
              SAVE
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapState = (store: any) => {
  return { user: store.user.user };
};

export default connect(mapState)(ProfileSettings);
