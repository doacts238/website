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
  refAppBar: any
};

type State = {};

class SiteAppBar extends Component<Props, State> {
  state: State = {};

  // constructor(props) {
  //   super(props);
  // }

  render() {
    const {
      className,
      classes,
      navMenuIcon = <MenuIcon />,
      onNavMenuButtonClick,
      title: titleProp = undefined,
      refAppBar = React.createRef(),
      ...otherProps
    } = this.props;
    //const {  } = this.state;

    let title = titleProp;
    if (!title) {
      title = (
        <Typography variant="h6" noWrap>
          Do Acts 2:38! Site
        </Typography>
      );
    }

    return (
      <AppBar
        ref={refAppBar}
        className={classNames(classes.root, className)}
        {...otherProps}
      >
        <Toolbar>
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
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = theme => ({
  root: {
    height: theme.spacing(theme.app.page.appBarHeight)
  },
  menuButton: {},
  menuIcon: {}
});

export default withStyles(styles)(withRouter(SiteAppBar));
