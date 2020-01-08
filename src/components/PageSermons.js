import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  withStyles,
  Backdrop,
  CircularProgress,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core';

import classNames from 'classnames';

import backendService from '../services/BackendService';
import SermonListItem from './SermonListItem';
import GridNoPadding from './GridNoPadding';

/* eslint-disable jsx-a11y/anchor-is-valid */

type Props = {
  classes: Object,
  className?: string,
  match: Object,
  location: Object,
  history: Object
};
type State = {
  sermons: Array,
  howMany: Number,
  showAll: Boolean
};

class PageSermons extends Component<Props, State> {
  state: State = {
    sermons: [],
    howMany: 5,
    showAll: false
  };

  async componentDidMount() {
    const { howMany, showAll } = this.state;
    await this.populateSermons(howMany, showAll);
  }

  async populateSermons(howMany: Number, showAll: Boolean) {
    // try {
    this.setState({ sermons: [] });
    let sermons = [];
    if (showAll) {
      sermons = await backendService.getAllSermons();
    } else {
      sermons = await backendService.getSermons(howMany);
    }
    this.setState({ sermons: sermons });
    // } catch (error) {
    //   //toast.error('Could not load movie data from the server.');
    //   //this.props.history.replace('/not-found');
    // }
  }

  handleSermonClick = (sermon: Object): void => {
    const { history } = this.props;
    if (history && sermon) {
      history.push({
        pathname: `/sermons/${sermon.AUDIO_ID}`,
        state: { sermon: sermon }
      });
    }
  };

  async handleHowManyChange(newVal: any): void {
    const { howMany, showAll } = this.state;
    if (newVal === 'ALL') {
      if (!showAll) {
        this.setState({ howMany: 0, showAll: true });
        await this.populateSermons(howMany, true);
      }
    } else {
      const newValInt = parseInt(newVal);
      if (howMany !== newValInt) {
        this.setState({ howMany: newValInt, showAll: false });
        await this.populateSermons(newValInt, false);
      }
    }
  }

  render() {
    const { className, classes } = this.props;
    const { sermons, howMany, showAll } = this.state;

    const howManySelectVal = showAll ? 'ALL' : '' + howMany;

    document.title = 'Do Acts 2:38 - Online Sermons';

    return (
      <div className={classNames(className, classes.root)}>
        <Typography component="div" variant="body2">
          <h1 style={{ marginTop: 0 }}>Apostolic Pulpit</h1>
          <p>
            This a collection of sermons, Bible teachings, etc., mostly by
            Pastor David Brown. They are prayerfully shared with hopes that the
            Lord by His Word will make you perfect, stablish, strengthen, and
            settle you. We would love to hear your{' '}
            <Link to="/contact" title="Contact Us">
              feedback
            </Link>{' '}
            about the Online Sermons feature!
          </p>
          {/*** /}
          <p>
            If you need help listening to the online sermons, please see our
            <a href="#" title="Online Sermons Instructions">
              Online Sermons Instructions
            </a>{' '}
            page.
          </p>
          <p>
            NOTE: You can burn these sermons to CD and listen to them anywhere!
            Visit our{' '}
            <a href="#" title="Burning Instructions">
              CD-ROM Burning Instructions
            </a>{' '}
            page.
          </p>
         {/***/}
          <h2 style={{ marginBottom: '0px' }}>
            <a name="SermonList">Sermon List</a>
          </h2>
          <GridNoPadding
            className={classes.howManyContainer}
            container
            alignItems="center"
            justify="flex-start"
            wrap="nowrap"
          >
            <GridNoPadding item xs>
              <Typography variant="button" style={{ whiteSpace: 'nowrap' }}>
                How many to show?
              </Typography>
            </GridNoPadding>
            <GridNoPadding item xs>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={howManySelectVal}
                  onChange={event =>
                    this.handleHowManyChange(event.target.value)
                  }
                >
                  <MenuItem value={'5'}>5</MenuItem>
                  <MenuItem value={'15'}>15</MenuItem>
                  <MenuItem value={'30'}>30</MenuItem>
                  <MenuItem value={'50'}>50</MenuItem>
                  <MenuItem value={'ALL'}>ALL</MenuItem>
                </Select>
                {/**/}
                {/**/}
              </FormControl>
            </GridNoPadding>
          </GridNoPadding>

          {sermons.length <= 0 ? (
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            sermons.map((sermon, index) => (
              <Fragment key={index}>
                <SermonListItem
                  className={classes.sermon}
                  sermon={sermon}
                  onListenClick={this.handleSermonClick}
                />
              </Fragment>
            ))
          )}
        </Typography>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    margin: 0,
    marginLeft: 'auto',
    marginReft: 'auto',
    padding: theme.spacing(3),
    width: '100%',
    minHeight: '100%'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  sermon: {
    margin: theme.spacing(3),
    marginTop: 0
  },
  howManyContainer: {
    marginLeft: theme.spacing(3),
    maxWidth: theme.spacing(45)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 50
  }
});

export default withStyles(styles)(PageSermons);
