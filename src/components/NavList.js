/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { List, ListItem, Typography, withStyles } from '@material-ui/core';

import HomeIcon from 'mdi-react/HomeIcon';
import QuestionIcon from 'mdi-react/HelpCircleIcon';
import SermonsIcon from 'mdi-react/VolumeHighIcon';
import ServicesIcon from 'mdi-react/CalendarClockIcon';
import ContactIcon from 'mdi-react/PhoneIcon';

import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

type Props = {
  classes: Object,
  className?: string,
  handleListItemClick: Function,
  itemVariant: String,
  match: Object,
  location: Object,
  history: Object
};

const NavList = (props: Props) => {
  const {
    classes,
    className,
    location,
    itemVariant = 'body2',
    handleListItemClick
  } = props;

  const urlMatch = location && location.pathname ? location.pathname : '';

  return (
    <List className={classNames(className, classes.root)}>
      <ListItem
        onClick={() => handleListItemClick('/')}
        className={classes.navListItem}
      >
        <HomeIcon className={classes.navIcon} />
        <Typography
          variant={itemVariant}
          className={classNames(classes.hoverPointer, {
            [classes.navListItemSelected]: urlMatch === '/'
          })}
        >
          Home
        </Typography>
      </ListItem>
      <ListItem
        onClick={() => handleListItemClick('/doacts238')}
        className={classes.navListItem}
      >
        <QuestionIcon className={classes.navIcon} />
        <Typography
          variant={itemVariant}
          className={classNames(classes.hoverPointer, {
            [classes.navListItemSelected]: urlMatch.startsWith('/doacts238')
          })}
        >
          Do Acts 2:38?
        </Typography>
      </ListItem>
      <ListItem
        onClick={() => handleListItemClick('/sermons')}
        className={classes.navListItem}
      >
        <SermonsIcon className={classes.navIcon} />
        <Typography
          variant={itemVariant}
          className={classNames(classes.hoverPointer, {
            [classes.navListItemSelected]: urlMatch.startsWith('/sermons')
          })}
        >
          Online Sermons
        </Typography>
      </ListItem>
      <ListItem
        onClick={() => handleListItemClick('/services')}
        className={classes.navListItem}
      >
        <ServicesIcon className={classes.navIcon} />
        <Typography
          variant={itemVariant}
          className={classNames(classes.hoverPointer, {
            [classes.navListItemSelected]: urlMatch.startsWith('/services')
          })}
        >
          Service Times
        </Typography>
      </ListItem>
      <ListItem
        onClick={() => handleListItemClick('/contact')}
        className={classes.navListItem}
      >
        <ContactIcon className={classes.navIcon} />
        <Typography
          variant={itemVariant}
          className={classNames(classes.hoverPointer, {
            [classes.navListItemSelected]: urlMatch.startsWith('/contact')
          })}
        >
          Contact Us
        </Typography>
      </ListItem>
    </List>
  );
};

const styles = theme => ({
  root: {},
  navIcon: {
    color: theme.palette.primary.light,
    marginRight: theme.spacing(1)
  },
  hoverPointer: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  navListItem: {
    padding: 0,
    margin: theme.spacing(3),
    marginRight: theme.spacing(2),
    width: theme.spacing(theme.app.page.navListWidth)
  },
  navListItemSelected: {
    fontWeight: 'bold'
  }
});

export default withStyles(styles)(withRouter(NavList));
