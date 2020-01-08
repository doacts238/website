import React, { Component } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  List,
  ListItem,
  withStyles,
  SwipeableDrawer
} from '@material-ui/core';

import MenuIcon from 'mdi-react/MenuIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import HomeIcon from 'mdi-react/HomeIcon';
import QuestionIcon from 'mdi-react/HelpCircleIcon';
import SermonsIcon from 'mdi-react/VolumeHighIcon';
import ServicesIcon from 'mdi-react/CalendarClockIcon';
import ContactIcon from 'mdi-react/ContactMailIcon';

import classNames from 'classnames';
import { Route, Switch, withRouter } from 'react-router-dom';
import PageHome from './PageHome';
import PageDoActs238 from './PageDoActs238';
import PageServices from './PageServices';
import PageSermons from './PageSermons';
import PageContact from './PageContact';
import PageSermonInfo from './PageSermonInfo';

type Props = {
  classes: Object,
  className?: string,
  match: Object,
  location: Object,
  history: Object
};

type State = { isDrawerOpen: Boolean };

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

class AppMobile extends Component<Props, State> {
  state: State = { isDrawerOpen: false };

  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
  }

  handleNavMenuButtonClick = () => {
    const { isDrawerOpen } = this.state;
    this.setDrawerOpen(!isDrawerOpen);
  };

  handleListItemClick = strUrl => {
    const { history } = this.props;

    if (history) {
      history.push({
        pathname: strUrl
      });
    }

    this.setDrawerOpen(false);
  };

  setDrawerOpen = (isOpen: Boolean) => {
    this.setState({ isDrawerOpen: isOpen });
  };

  render() {
    const { className, classes, location } = this.props;
    const { isDrawerOpen } = this.state;

    const urlMatch = location && location.pathname ? location.pathname : '';

    return (
      <div id="appRoot" className={classNames(className, classes.root)}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Hidden mdUp>
              <IconButton
                className={classes.menuButton}
                onClick={this.handleNavMenuButtonClick}
                color="inherit"
                aria-label="open menu"
                edge="start"
              >
                {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Hidden>
            <Typography variant="h6" noWrap>
              Do Acts 2:38! Mobile
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />

        <div ref={this.contentRef} className={classes.content}>
          <Switch>
            <Route
              path="/doacts238"
              exact
              render={props => <PageDoActs238 {...props} />}
            />
            <Route
              path="/services"
              render={props => <PageServices {...props} />}
            />
            <Route
              path="/sermons/:sermonId(\d+)"
              exact
              render={props => <PageSermonInfo {...props} />}
            />
            <Route
              path="/sermons"
              render={props => <PageSermons {...props} />}
            />
            <Route
              path="/contact"
              render={props => <PageContact {...props} />}
            />
            <Route path="/" exact render={props => <PageHome {...props} />} />
          </Switch>
        </div>

        <SwipeableDrawer
          classes={{ paper: classes.navDrawer }}
          open={isDrawerOpen}
          onClose={() => this.setDrawerOpen(false)}
          onOpen={() => this.setDrawerOpen(true)}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
        >
          <List>
            <ListItem
              onClick={() => this.handleListItemClick('/')}
              className={classNames({
                [classes.navListItem]: true,
                [classes.navListItemSelected]: urlMatch === '/'
              })}
            >
              <HomeIcon className={classes.navIcon} /> Home
            </ListItem>
            <ListItem
              onClick={() => this.handleListItemClick('/doacts238')}
              className={classNames({
                [classes.navListItem]: true,
                [classes.navListItemSelected]: urlMatch.startsWith('/doacts238')
              })}
            >
              <QuestionIcon className={classes.navIcon} /> Do Acts 2:38?
            </ListItem>
            <ListItem
              onClick={() => this.handleListItemClick('/sermons')}
              className={classNames({
                [classes.navListItem]: true,
                [classes.navListItemSelected]: urlMatch.startsWith('/sermons')
              })}
            >
              <SermonsIcon className={classes.navIcon} /> Online Sermons
            </ListItem>
            <ListItem
              onClick={() => this.handleListItemClick('/services')}
              className={classNames({
                [classes.navListItem]: true,
                [classes.navListItemSelected]: urlMatch.startsWith('/services')
              })}
            >
              <ServicesIcon className={classes.navIcon} />{' '}
              <span>Service Times</span>
            </ListItem>
            <ListItem
              onClick={() => this.handleListItemClick('/contact')}
              className={classNames({
                [classes.navListItem]: true,
                [classes.navListItemSelected]: urlMatch.startsWith('/contact')
              })}
            >
              <ContactIcon className={classes.navIcon} /> Contact Us
            </ListItem>
          </List>
        </SwipeableDrawer>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    margin: 0,
    marginLeft: 'auto',
    marginReft: 'auto',
    padding: 0,
    minHeight: '100%',
    width: '100%',
    flexGrow: 1
  },
  appBar: {},
  content: {
    height: '100%',
    width: '100%'
  },
  button: {
    margin: theme.spacing(1)
  },
  navDrawer: {
    background: theme.app.palette.background.default
  },
  navIcon: {
    color: theme.palette.secondary.dark,
    marginRight: theme.spacing(1)
  },
  navListItem: {
    padding: 0,
    margin: theme.spacing(2),
    width: theme.spacing(theme.app.page.navListWidth)
  },
  navListItemSelected: {
    fontWeight: 'bold'
  },
  menuButton: {},
  toolbar: theme.mixins.toolbar
});

export default withStyles(styles)(withRouter(AppMobile));