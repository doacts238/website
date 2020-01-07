/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Typography,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  Link,
  Box
} from '@material-ui/core';

import TruncateMarkupToggle from './common/TruncateMarkupToggle';

import classNames from 'classnames';
import GridNoPadding from './GridNoPadding';

type Props = {
  className?: string,
  sermon: Object,
  onListenClick: Function,
  key: Number
};

const SermonListItem = ({ className, sermon, onListenClick }: Props) => {
  const classes = useStyles();

  if (!sermon.AUDIO_DESC) {
    sermon.AUDIO_DESC = sermon.AUDIO_TITLE;
  }

  return (
    <Card className={classNames(className, classes.root)}>
      <CardContent className={classes.content}>
        <GridNoPadding container wrap="nowrap" className={classes.info}>
          <GridNoPadding item xs>
            <Typography
              variant="overline"
              display="block"
              color="textSecondary"
              style={{ whiteSpace: 'nowrap' }}
            >
              {sermon.AUDIO_DATE} {sermon.AUDIO_SERVICE}
            </Typography>
          </GridNoPadding>
          <GridNoPadding item xs>
            <Typography
              variant="overline"
              display="block"
              color="textSecondary"
              align="right"
              style={{ whiteSpace: 'nowrap' }}
            >
              {sermon.AUDIO_LENGTH}
            </Typography>
          </GridNoPadding>
        </GridNoPadding>
        <Link
          variant="h6"
          underline="hover"
          className={classNames(classes.title, classes.hoverPointer)}
          onClick={() => onListenClick(sermon)}
        >
          {sermon.AUDIO_TITLE}
        </Link>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          className={classes.author}
        >
          {sermon.AUDIO_AUTHOR}
        </Typography>
        <TruncateMarkupToggle lines={4} truncated={true}>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.desc}
            style={{ paddingBottom: 0 }}
          >
            {sermon.AUDIO_DESC}
          </Typography>
        </TruncateMarkupToggle>
      </CardContent>
      <CardActions>
        <Box marginLeft="auto">
          <Button color="primary" onClick={() => onListenClick(sermon)}>
            Listen or Download
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    marginLeft: 'auto',
    marginReft: 'auto',
    padding: 0
  },
  content: {
    paddingTop: '1px',
    margin: 0,
    borderBottom: `1px dotted ${theme.palette.secondary.main}`
  },
  title: {
    color: theme.palette.primary.main
  },
  author: {},
  desc: {
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(0)
  },
  info: {},
  hoverPointer: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

export default SermonListItem;
