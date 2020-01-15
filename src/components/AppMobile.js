import React, { Component } from 'react';
import { Toolbar, withStyles, SwipeableDrawer } from '@material-ui/core';

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
import SiteAppBar from './SiteAppBar';

type Props = {
  classes: Object,
  className?: string,
  match: Object,
  location: Object,
  history: Object
};

type State = {
  isLeftDrawerOpen: Boolean,
  isRightDrawerOpen: Boolean
};

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

class AppMobile extends Component<Props, State> {
  state: State = {
    isLeftDrawerOpen: false,
    isRightDrawerOpen: false
  };

  constructor(props) {
    super(props);
    this.refAppBar = React.createRef();
  }

  handleNavMenuButtonClick = () => {
    const { isLeftDrawerOpen, isRightDrawerOpen } = this.state;
    if (isLeftDrawerOpen || isRightDrawerOpen) {
      this.setState({ isLeftDrawerOpen: false });
      this.setState({ isRightDrawerOpen: false });
    } else {
      this.setState({ isLeftDrawerOpen: !isLeftDrawerOpen });
    }
  };

  handleListItemClick = strUrl => {
    const { history } = this.props;

    if (history) {
      history.push({
        pathname: strUrl
      });
    }
    this.setState({ isLeftDrawerOpen: false });
    this.setState({ isRightDrawerOpen: false });
  };

  render() {
    const { className, classes } = this.props;
    const { isLeftDrawerOpen, isRightDrawerOpen } = this.state;

    let heightAppBar = 56;
    if (
      this.refAppBar &&
      this.refAppBar.current &&
      this.refAppBar.current.getBoundingClientRect
    ) {
      heightAppBar = this.refAppBar.current.getBoundingClientRect().height;
    }

    const MySwipeableDraw = (props: Object = {}) => (
      <SwipeableDrawer
        {...props}
        style={{ top: `${heightAppBar}px` }}
        classes={{ paper: classes.navDrawerPaper }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        BackdropProps={{
          classes: { root: classes.navDrawerBackdropRoot }
        }}
      >
        <NavList
          classes={{ navListItem: classes.navListItem }}
          onListItemClick={this.handleListItemClick}
        />
      </SwipeableDrawer>
    );

    return (
      <div id="appRoot" className={classNames(className, classes.root)}>
        <SiteAppBar
          refAppBar={this.refAppBar}
          navMenuIcon={
            isLeftDrawerOpen || isRightDrawerOpen ? <CloseIcon /> : <MenuIcon />
          }
          disableControls={isLeftDrawerOpen || isRightDrawerOpen}
          onNavMenuButtonClick={this.handleNavMenuButtonClick}
        />
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
        <MySwipeableDraw
          anchor="left"
          open={isLeftDrawerOpen}
          onClose={() => this.setState({ isLeftDrawerOpen: false })}
          onOpen={() => this.setState({ isLeftDrawerOpen: true })}
        />
        <MySwipeableDraw
          anchor="right"
          open={isRightDrawerOpen}
          onClose={() => this.setState({ isRightDrawerOpen: false })}
          onOpen={() => this.setState({ isRightDrawerOpen: true })}
        />
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
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
  content: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.default
  },
  navDrawerPaper: {
    background: theme.app.palette.background.default,
    top: theme.mixins.toolbar.minHeight
  },
  navDrawerBackdropRoot: {
    top: theme.mixins.toolbar.minHeight
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
