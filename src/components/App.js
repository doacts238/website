import React, { Component } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  Container,
  withStyles
} from '@material-ui/core';

import MenuIcon from 'mdi-react/MenuIcon';
import CloseIcon from 'mdi-react/CloseIcon';

import classNames from 'classnames';
import GridNoPadding from './GridNoPadding';
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
type State = {
  isLargeScreen: Boolean,
  isNavListOpen: boolean,
  isMounted: true,
  appBarHeight: Number
};

const DETECTOR_SMALL = 1;
const DETECTOR_LARGE = 2;

class App extends Component<Props, State> {
  state: State = {
    isLargeScreen: false,
    isNavListOpen: false,
    isMounted: false,
    appBarHeight: 0
  };

  constructor(props) {
    super(props);
    this.detectorRef = React.createRef();
    this.contentRef = React.createRef();
  }

  componentDidMount() {
    const detectorWidth: Number = this.getDetectorWidth();
    const isLargeScreen = detectorWidth === DETECTOR_LARGE;
    this.setState({
      isLargeScreen: isLargeScreen,
      isNavListOpen: isLargeScreen,
      isMounted: true
    });
  }

  getDetectorWidth = (): Number => {
    let retVal: Number = -1;

    const detectorElement = this.detectorRef.current;
    if (detectorElement && detectorElement.getBoundingClientRect) {
      const detectorWidth = detectorElement.getBoundingClientRect().width;
      if (typeof detectorWidth === 'number') {
        retVal = detectorWidth;
      }
    }

    return retVal;
  };

  handleNavMenuButtonClick = () => {
    const { isNavListOpen } = this.state;
    this.setState({
      isNavListOpen: !isNavListOpen
    });
  };

  handleListItemClick = strUrl => {
    const { history } = this.props;
    const { isNavListOpen, isLargeScreen } = this.state;

    if (history) {
      history.push({
        pathname: strUrl
      });
      if (!isLargeScreen && isNavListOpen) {
        this.setState({ isNavListOpen: false });
      }
    }
  };

  render() {
    const { className, classes } = this.props;
    const { isNavListOpen, isLargeScreen } = this.state;

    // Overcome scroll position issue caused  by React Router.
    // See https://reacttraining.com/react-router/web/guides/scroll-restoration
    // But I couldn't fix it that way because the main windows isn't scrolling.
    if (this.contentRef && this.contentRef.current) {
      this.contentRef.current.focus();
      this.contentRef.current.scrollTop = 0;
    }

    let menuIcon = <MenuIcon className={classes.menuButton} />;
    if (isNavListOpen) {
      menuIcon = <CloseIcon className={classes.menuButton} />;
    }

    return (
      <div id="appRoot" className={classNames(className, classes.root)}>
        {/**/}
        <AppBar id="appBar" position="static">
          <Toolbar>
            <Hidden mdUp>
              <IconButton
                className={classes.menuButton}
                onClick={this.handleNavMenuButtonClick}
                color="inherit"
                aria-label="open menu"
                edge="start"
              >
                {menuIcon}
              </IconButton>
            </Hidden>
            <Typography variant="h6" noWrap>
              Do Acts 2:38!
            </Typography>
          </Toolbar>
        </AppBar>
        {/**/}
        <div ref={this.detectorRef} className={classes.detector} />
        <GridNoPadding id="app_grid_container" container spacing={0}>
          <GridNoPadding item>
            <NavList
              classes={{ navListItem: classes.navListItem }}
              handleListItemClick={this.handleListItemClick}
            />
          </GridNoPadding>
          <GridNoPadding item xs>
            <Container
              disableGutters
              className={classNames(classes.content)}
              ref={this.contentRef}
            >
              <div
                className={classNames({
                  [classes.myBackdrop]: true,
                  [classes.displayNone]: isLargeScreen || !isNavListOpen
                })}
              />
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
                <Route
                  path="/"
                  exact
                  render={props => <PageHome {...props} />}
                />
              </Switch>
              {/*<Toolbar />*/}
            </Container>
          </GridNoPadding>
        </GridNoPadding>
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
    zIndex: 1
  },
  button: {
    margin: theme.spacing(1)
  },
  navListItem: {
    padding: theme.spacing(2),
    paddingRight: theme.spacing(1),
    margin: 0,
    width: theme.spacing(theme.app.page.navListWidth)
  },
  content: {
    //border: '2px solid blue',
    position: 'fixed',
    [theme.breakpoints.down('sm')]: {
      maxWidth: theme.spacing(theme.app.page.pageMaxWidth)
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.spacing(
        theme.app.page.pageMaxWidth - theme.app.page.navListWidth
      )
    },
    // The following isn't TOO weird because the MUI examples also use it.
    height: `calc(100% - ${theme.spacing(theme.app.page.appBarHeight)}px)`,
    overflow: 'auto',
    margin: 0,
    padding: 0
  },
  detector: {
    visibility: 'hidden',
    height: 0,
    [theme.breakpoints.down('sm')]: {
      width: `${DETECTOR_SMALL}px`
    },
    [theme.breakpoints.up('md')]: {
      width: `${DETECTOR_LARGE}px`
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {},
  myBackdrop: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.10)',
    WebkitTapHighlightColor: 'transparent',
    // Disable scroll capabilities.
    touchAction: 'none'
  },
  displayNone: {
    display: 'none'
  }
  //offset: theme.mixins.toolbar
});

export default withStyles(styles)(withRouter(App));
