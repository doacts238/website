import React, { Component } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  withStyles,
  SwipeableDrawer
} from '@material-ui/core';

import MenuIcon from 'mdi-react/MenuIcon';
import CloseIcon from 'mdi-react/CloseIcon';

import classNames from 'classnames';
import { Route, Switch, withRouter } from 'react-router-dom';
import PageHome from './PageHome';
import PageDoActs238 from './PageDoActs238';
import PageServices from './PageServices';
import PageSermons from './PageSermons';
import PageContact from './PageContact';
import PageSermonInfo from './PageSermonInfo';
import NavList from './NavList';

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
    this.refAppBar = React.createRef();
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
    const { className, classes } = this.props;
    const { isDrawerOpen } = this.state;

    let heightAppBar = 56;
    if (
      this.refAppBar &&
      this.refAppBar.current &&
      this.refAppBar.current.getBoundingClientRect
    ) {
      heightAppBar = this.refAppBar.current.getBoundingClientRect().height;
    }

    return (
      <div id="appRoot" className={classNames(className, classes.root)}>
        <AppBar ref={this.refAppBar} className={classes.appBar}>
          <Toolbar>
            <Hidden mdUp>
              <IconButton
                className={classes.menuButton}
                onClick={this.handleNavMenuButtonClick}
                color="inherit"
                aria-label="open menu"
                edge="start"
              >
                {isDrawerOpen ? (
                  <CloseIcon className={classes.menuButton} />
                ) : (
                  <MenuIcon className={classes.menuButton} />
                )}
              </IconButton>
            </Hidden>
            <Typography variant="h6" noWrap>
              Do Acts 2:38!
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />

        <div className={classes.content}>
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
          style={{ top: `${heightAppBar}px` }}
          classes={{ paper: classes.navDrawerPaper }}
          open={isDrawerOpen}
          onClose={() => this.setDrawerOpen(false)}
          onOpen={() => this.setDrawerOpen(true)}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          BackdropProps={{ classes: { root: classes.navDrawerBackdropRoot } }}
        >
          <NavList
            classes={{ navListItem: classes.navListItem }}
            handleListItemClick={this.handleListItemClick}
          />
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
  appBar: {
    height: theme.spacing(theme.app.page.appBarHeight)
  },
  content: {
    height: '100%',
    width: '100%'
  },
  navDrawerPaper: {
    background: theme.app.palette.background.default,
    marginTop: theme.spacing(theme.app.page.appBarHeight)
  },
  navDrawerBackdropRoot: {
    top: theme.spacing(theme.app.page.appBarHeight)
  },
  navListItem: {
    padding: 0,
    margin: theme.spacing(3),
    marginRight: theme.spacing(2),
    width: theme.spacing(theme.app.page.navListWidth)
  },
  menuButton: {},
  toolbar: theme.mixins.toolbar
});

export default withStyles(styles)(withRouter(AppMobile));
