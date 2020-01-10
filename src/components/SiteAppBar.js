import React, { Component } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  withStyles
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import MenuIcon from 'mdi-react/MenuIcon';
//import BackIcon from 'mdi-react/ArrowLeftIcon';
import HomeIcon from 'mdi-react/HomeIcon';
import SermonsIcon from 'mdi-react/VolumeHighIcon';

import classNames from 'classnames';

type Props = {
  classes: Object,
  className?: string,
  match: Object,
  location: Object,
  history: Object,
  title: React.ReactNode,
  navMenuIcon: React.ReactNode,
  onNavMenuButtonClick: Function,
  onSermonsButtonClick: Function,
  refAppBar: any,
  disableControls: Boolean
};

type State = {};

class SiteAppBar extends Component<Props, State> {
  state: State = {};

  // constructor(props) {
  //   super(props);
  // }

  handleSermonsButtonClick = strUrl => {
    const { history, location } = this.props;

    if (history && location) {
      if (location.pathname.startsWith('/sermon')) {
        //history.goBack();
        history.push({
          pathname: '/'
        });
      } else
        history.push({
          pathname: '/sermons'
        });
    }
  };

  render() {
    const {
      className,
      classes,
      navMenuIcon = <MenuIcon />,
      onNavMenuButtonClick,
      onSermonsButtonClick = this.handleSermonsButtonClick,
      title: titleProp = undefined,
      refAppBar = React.createRef(),
      disableControls = false,
      location,
      ...otherProps
    } = this.props;
    //const {  } = this.state;

    let title = titleProp;
    if (!title) {
      title = (
        <Typography variant="h6" noWrap>
          Do Acts 2:38!
        </Typography>
      );
    }

    const urlMatch = location && location.pathname ? location.pathname : '';

    return (
      <AppBar
        ref={refAppBar}
        className={classNames(className, classes.root, classes.toolbar)}
        {...otherProps}
      >
        <Toolbar className={classes.toolbar}>
          <Hidden mdUp>
            <IconButton
              className={classes.menuButton}
              onClick={onNavMenuButtonClick}
              color="inherit"
              aria-label="open menu"
              edge="start"
            >
              {navMenuIcon}
            </IconButton>
          </Hidden>
          {title}
          <div className={classes.grow} />
          <IconButton
            className={classes.menuButton}
            onClick={onSermonsButtonClick}
            color="inherit"
            aria-label="goto sermons page"
            edge="start"
            disabled={disableControls}
          >
            {urlMatch.startsWith('/sermon') ? <HomeIcon /> : <SermonsIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = theme => ({
  root: {},
  toolbar: theme.mixins.toolbar,
  menuButton: {},
  menuIcon: {},
  grow: {
    flexGrow: 1
  }
});

export default withStyles(styles)(withRouter(SiteAppBar));
