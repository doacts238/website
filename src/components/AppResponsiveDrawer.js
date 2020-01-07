import React from 'react';
import logo from '../images/logo.svg';
import {
  Typography,
  makeStyles,
  Divider,
  List,
  ListItem,
  ListItemText,
  Hidden,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  ListItemIcon
} from '@material-ui/core';
import MailIcon from 'mdi-react/MailIcon';
import MenuIcon from 'mdi-react/MenuIcon';
import InboxIcon from 'mdi-react/InboxIcon';

import classNames from 'classnames';
import PageHome from './PageHome';

const drawerWidth = 207;

type Props = {
  className?: string
};

const App = ({ className }: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {[
          'Home',
          'Do Acts 2:38?',
          'Sermon Audio',
          'Service Times',
          'Contact Us'
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classNames(className, classes.root)}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Do Acts 2:38!
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <PageHome></PageHome>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    margin: 'auto',
    padding: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1)
  },
  appLogo: {
    height: '40vmin',
    animation: '$spin infinite 20s linear'
  },
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
  },
  paper: {
    padding: theme.spacing(2)
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: '${drawerWidth}px',
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar
}));

export default App;
