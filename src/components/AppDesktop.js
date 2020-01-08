import React, { Component } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  Container,
  withStyles
} from '@material-ui/core';

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
type State = {};

class App extends Component<Props, State> {
  state: State = {};

  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
  }

  handleListItemClick = strUrl => {
    const { history } = this.props;

    if (history) {
      history.push({
        pathname: strUrl
      });
    }
  };

  render() {
    const { className, classes } = this.props;

    // Overcome scroll position issue caused  by React Router.
    // See https://reacttraining.com/react-router/web/guides/scroll-restoration
    // But I couldn't fix it that way because the main windows isn't scrolling.
    if (this.contentRef && this.contentRef.current) {
      this.contentRef.current.focus();
      this.contentRef.current.scrollTop = 0;
    }

    return (
      <div id="appRoot" className={classNames(className, classes.root)}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <Typography variant="h6" noWrap>
              Do Acts 2:38!
            </Typography>
          </Toolbar>
        </AppBar>
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
  appBar: {
    height: theme.spacing(theme.app.page.appBarHeight)
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
    maxWidth: theme.spacing(
      theme.app.page.pageMaxWidth - theme.app.page.navListWidth
    ),
    // The following isn't TOO weird because the MUI examples also use it.
    height: `calc(100% - ${theme.spacing(theme.app.page.appBarHeight)}px)`,
    overflow: 'auto',
    margin: 0,
    padding: 0
  }
  //offset: theme.mixins.toolbar
});

export default withStyles(styles)(withRouter(App));
