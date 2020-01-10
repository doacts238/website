import React, { useEffect, useState } from 'react';
import {
  Typography,
  makeStyles,
  Backdrop,
  CircularProgress
} from '@material-ui/core';

import classNames from 'classnames';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  TumblrShareButton,
  EmailShareButton
} from 'react-share';
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  EmailIcon
} from 'react-share';

import backendService from '../services/BackendService';
import GridNoPadding from './GridNoPadding';

type Props = {
  className?: string,
  match: Object,
  location: Object,
  history: Object
};

const PageSermonInfo = ({ className, match, location, history }: Props) => {
  document.title = 'Do Acts 2:38 Online Sermon';
  const classes = useStyles();

  let sermon_arg = null;
  if (location && location.state && location.state.sermon) {
    sermon_arg = location.state.sermon;
  }

  const [sermon, setSermon] = useState(sermon_arg);

  useEffect(() => {
    /* some componentDiDMount code */
    if (!sermon_arg) {
      async function componentDidMount() {
        setSermon(await backendService.getSermon(match.params.sermonId));
      }
      componentDidMount();
    }
  }, [sermon_arg, match.params.sermonId]);

  if (!sermon) {
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  document.title = `Do Acts 2:38 - ${sermon.AUDIO_TITLE}`;

  //const sermonUrl = `https://doacts238.org/sermons/${sermon.AUDIO_FILE_HIGH}`;
  const sermonUrl = `https://audio.doacts238.org/files/${sermon.AUDIO_FILE_HIGH}`;
  const thisPageUrl = `https://testing.doacts238.org/sermon/${sermon.AUDIO_ID}`;
  const shareIconSize = 24;

  return (
    <div className={classNames(className, classes.root)}>
      <Typography
        variant="caption"
        className={classes.presents}
        color="textSecondary"
      >
        Apostolic Pulpit Presents...
      </Typography>

      <Typography variant="h3" className={classes.title}>
        {sermon.AUDIO_TITLE}
      </Typography>

      <Typography variant="subtitle1" className={classes.author}>
        By: <span style={{ fontWeight: 'bold' }}>{sermon.AUDIO_AUTHOR}</span>
      </Typography>

      <Typography variant="subtitle1" className={classes.dte}>
        Date: {sermon.AUDIO_DATE} {sermon.AUDIO_SERVICE}
      </Typography>

      <Typography variant="subtitle1" className={classes.length}>
        Length: {sermon.AUDIO_LENGTH}
      </Typography>

      <div className={classes.player}>
        <audio controls>
          <source src={sermonUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      <div className={classes.share}>
        <GridNoPadding container alignItems="center">
          <GridNoPadding item xs>
            <Typography variant="button" style={{ marginRight: '10px' }}>
              Share:
            </Typography>
          </GridNoPadding>
          <GridNoPadding item xs>
            <FacebookShareButton
              url={thisPageUrl}
              quote={sermon.AUDIO_TITLE}
              hashtag="#DoActs238"
            >
              <FacebookIcon
                size={shareIconSize}
                round={true}
                className={classes.hoverPointer}
              />
            </FacebookShareButton>
          </GridNoPadding>
          <GridNoPadding item xs>
            <TwitterShareButton
              url={thisPageUrl}
              title={sermon.AUDIO_TITLE}
              hashtags={['DoActs238']}
            >
              <TwitterIcon
                size={shareIconSize}
                round={true}
                className={classes.hoverPointer}
              />
            </TwitterShareButton>
          </GridNoPadding>
          <GridNoPadding item xs>
            <WhatsappShareButton url={thisPageUrl} title={sermon.AUDIO_TITLE}>
              <WhatsappIcon
                size={shareIconSize}
                round={true}
                className={classes.hoverPointer}
              />
            </WhatsappShareButton>
          </GridNoPadding>
          <GridNoPadding item xs>
            <RedditShareButton url={thisPageUrl} title={sermon.AUDIO_TITLE}>
              <RedditIcon
                size={shareIconSize}
                round={true}
                className={classes.hoverPointer}
              />
            </RedditShareButton>
          </GridNoPadding>
          <GridNoPadding item xs>
            <TumblrShareButton
              url={thisPageUrl}
              title={sermon.AUDIO_TITLE}
              tags={['DoActs238']}
            >
              <TumblrIcon
                size={shareIconSize}
                round={true}
                className={classes.hoverPointer}
              />
            </TumblrShareButton>
          </GridNoPadding>
          <GridNoPadding item xs>
            <EmailShareButton url={thisPageUrl} subject={sermon.AUDIO_TITLE}>
              <EmailIcon
                size={shareIconSize}
                round={true}
                className={classes.hoverPointer}
              />
            </EmailShareButton>
          </GridNoPadding>
        </GridNoPadding>
      </div>

      <Typography variant="subtitle1" className={classes.descLabel}>
        Description:
      </Typography>
      <Typography variant="body1" className={classes.desc}>
        {sermon.AUDIO_DESC}
      </Typography>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
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
  presents: {
    fontStyle: 'italic'
  },
  title: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
  author: {},
  date: {},
  length: {},
  descLabel: {
    marginTop: theme.spacing(3)
  },
  desc: {
    marginLeft: theme.spacing(3)
  },
  player: {
    marginTop: theme.spacing(3)
  },
  share: {
    marginTop: theme.spacing(2),
    width: theme.spacing(36)
  },
  hoverPointer: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

export default PageSermonInfo;
