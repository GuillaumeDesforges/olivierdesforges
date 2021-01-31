import AppBar from "@material-ui/core/AppBar/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer/Drawer";
import Hidden from "@material-ui/core/Hidden/Hidden";
import IconButton from "@material-ui/core/IconButton/IconButton";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import BrushIcon from "@material-ui/icons/Brush";
import MenuIcon from "@material-ui/icons/Menu";
import CreateIcon from "@material-ui/icons/Create";
import { useState } from "react";

const useStyles = makeStyles((style) => ({
  container: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "top",
    alignItems: "stretch",
  },
  appBar: {
    height: "64px",
    justifyContent: "center",
  },
  navbarToolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navbarLinksList: {
    display: "flex",
    flexDirection: "row",
  },
  drawerLinksList: {
    display: "flex",
    flexDirection: "column",
  },
  navbarLinkItemIcon: {
    paddingLeft: 0,
  },
  main: {
    flexGrow: 1,
    padding: "10px",
    marginTop: "70px",
    marginBottom: "3em",
  },
  footer: {
    background: style.palette.primary.main,
    color: style.palette.primary.contrastText,
    padding: "0.5em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const navItems = [
  {
    text: "Gallery",
    icon: <BrushIcon />,
  },
  {
    text: "Writing",
    icon: <CreateIcon />,
  },
];

const NavLinkList = ({ type }: { type: "navbar" | "drawer" }) => {
  const classes = useStyles();
  return (
    <List
      className={
        type == "navbar"
          ? classes.navbarLinksList
          : type == "drawer"
          ? classes.drawerLinksList
          : null
      }
    >
      {navItems.map(({ text, icon }) => (
        <ListItem button key={text}>
          <ListItemIcon className={classes.navbarLinkItemIcon}>
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );
};

const Layout = ({ children }) => {
  const classes = useStyles();

  const [isNavDrawerShown, setNavDrawnerShown] = useState(false);

  return (
    <>
      <CssBaseline />
      <div role="presentation" className={classes.container}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.navbarToolbar}>
            <Typography variant="h6">Olivier Desforges</Typography>
            <Hidden smUp implementation="css">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setNavDrawnerShown(true)}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Drawer
              anchor="top"
              open={isNavDrawerShown}
              onClose={() => setNavDrawnerShown(false)}
            >
              <div role="presentation">
                <NavLinkList type="drawer" />
              </div>
            </Drawer>
            <Hidden xsDown implementation="css">
              <NavLinkList type="navbar" />
            </Hidden>
          </Toolbar>
        </AppBar>
        <main className={classes.main}>{children}</main>
        <footer className={classes.footer}>
          <Typography>
            olivier-desforges.fr - made by Guillaume Desforges
          </Typography>
        </footer>
      </div>
    </>
  );
};

export default Layout;
