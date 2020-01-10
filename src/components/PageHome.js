import React, { Fragment } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
//import pastorImage from '../images/PastorDavidBrown.png';
import topImage from '../images/topImage.png';

import classNames from 'classnames';

type Props = {
  className?: string
};

const PageHome = ({ className }: Props) => {
  const classes = useStyles();

  document.title = 'Do Acts 2:38!';

  // const [anchorEl: Element, setAnchorEl: Function] = React.useState(null);
  // const [msgIndex: Number, setMsgIndex: Function] = React.useState(-1);

  // const messages = [
  //   'Stop poking me!',
  //   'Ouch! That hurts!',
  //   'Leave me alone!',
  //   'Go away!'
  // ];

  // const handleClick = event => {
  //   setAnchorEl(anchorEl ? null : event.currentTarget);
  //   setTimeout(() => setAnchorEl(null), 1250);

  //   const ndx = (msgIndex + 1) % messages.length;
  //   setMsgIndex(ndx);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popper' : undefined;

  // const message = messages[msgIndex];
  return (
    <Fragment>
      <img src={topImage} alt="Clouds over lake" className={classes.topImage} />
      <div className={classNames(className, classes.root)}>
        <Typography component="div" variant="body2">
          {/** /}
        <div className={classes.calloutRight} style={{ textAlign: 'center' }}>
          <div className={classes.textBox}>
            <img
              src={pastorImage}
              alt="Pastor David A. Brown"
              onClick={handleClick}
            />
            <div className={classes.calloutCaption}>
              Pastor David A. Brown
              <br />
              <Typography variant="caption" style={{ fontStyle: 'italic' }}>
                New Life Worship Center
              </Typography>
            </div>
          </div>
        </div>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <div className={classes.paper}>{message}</div>
        </Popper>
        {/**/}

          <h1 style={{ marginTop: 0 }}>Welcome!</h1>
          <p>
            We at{' '}
            <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
              New Life Worship Center
            </span>{' '}
            of Elkmont, Alabama, would like to thank you for taking the time to
            visit our website.
          </p>

          <p>
            Believing that "a stream is purest at its source", we strive to
            follow the pattern of the Apostles in the early Church as is
            documented in Acts 2:42. Specifically, we believe that the four
            practices listed in this verse contributed to the success of the
            early Church. We endeavor to build our church upon these same four
            pillars: "<i>...they continued steadfastly in</i>
          </p>

          <ol>
            <li>
              <i>the apostles' doctrine and</i>
            </li>
            <li>
              <i>fellowship, and</i>
            </li>
            <li>
              <i>in breaking of bread, and</i>
            </li>
            <li>
              <i>in prayers.</i>"
            </li>
          </ol>
          <p>
            We earnestly contend for the same faith delivered to the saints of
            old.
          </p>

          <p>
            Please feel free to take the time to browse through the rest of our
            web pages,{' '}
            <Link title="Listen to Sermons" to="/sermons">
              listen to sermons
            </Link>{' '}
            online. If you have any prayer request, you can{' '}
            <Link title="Contact Us" to="/contact">
              contact us
            </Link>{' '}
            by{' '}
            <a href="mailto:pastor@DoActs238.org" title="Email the Pastor">
              email
            </a>
            . Or, just send us an{' '}
            <a href="mailto:pastor@DoActs238.org" title="Email the Pastor">
              email
            </a>{' '}
            and let us know that you were here.
          </p>

          <p>
            Again, thank you for visiting our website; we hope to see you soon
            at New Life Worship Center &mdash;{' '}
            <i>the Church where you have no past, only a future.</i>
          </p>

          <p>Sincerely,</p>

          <p>
            <b>Pastor David A. Brown</b> on behalf of the family of New Life
            Worship Center
          </p>
        </Typography>
      </div>
    </Fragment>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    //border: '2px solid red',
    margin: 0,
    padding: theme.spacing(3),
    paddingTop: theme.spacing(1),
    width: '100%',
    height: '100%'
  },
  calloutRight: {
    margin: 0,
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      width: '214px',
      marginRight: 'auto',
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.up('md')]: {
      float: 'right',
      position: 'relative' /* fix IE peekaboo bug */
    }
  },
  textBox: {
    border: '1px dotted #55411C',
    margin: '5px',
    padding: '10px'
  },
  calloutCaption: {
    borderTop: '1pt dotted #A8946F',
    margin: 0,
    marginTop: '5px',
    padding: 0,
    paddingTop: '5px'
  },
  paper: {
    marginTop: '10px',
    border: '2px solid darkred',
    borderRadius: '10px',
    padding: theme.spacing(1),
    backgroundColor: theme.app.palette.background.default,
    color: 'red',
    fontWeight: 'bold'
  },
  topImageBg: {
    backgroundImage: `url(${topImage})`,
    backgroundSize: 'contain',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      height: '75px'
    },
    [theme.breakpoints.up('md')]: {
      height: '200px'
    }
  },
  topImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain'
  }
}));

export default PageHome;
