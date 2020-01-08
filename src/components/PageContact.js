import React from 'react';
import { Typography, makeStyles, Link } from '@material-ui/core';

import MapMarkerIcon from 'mdi-react/MapMarkerIcon';

import classNames from 'classnames';

type Props = {
  className?: string
};

const PageContact = ({ className }: Props) => {
  const classes = useStyles();

  document.title = 'Do Acts 2:38 - Contact Information';

  return (
    <div className={classNames(className, classes.root)}>
      <Typography component="div" variant="body2">
        <h1 style={{ marginTop: 0 }}>How to Contact Us</h1>

        <p>
          We would love to hear from you. Here are several ways to contact us.
        </p>

        <h2>Street Address:</h2>
        <div style={{ marginLeft: '25px' }}>
          New Life Worship Center
          <br />
          27390 Thach Rd
          <br />
          Elkmont, AL 35620
          <br />
          <div className={classes.markerLink}>
            <MapMarkerIcon style={{ color: 'darkred', marginRight: '5px' }} />
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://goo.gl/maps/pSgrYs2SEyRocjiF8"
              variant="button"
              underline="hover"
            >
              Show on Google Maps
            </Link>
          </div>
        </div>

        <h2>Phone Numbers:</h2>
        <div style={{ marginLeft: '25px' }}>
          <div style={{ fontWeight: 'bold' }}>Pastor David Brown:</div>
          <div style={{ marginLeft: '25px' }}>
            Cell: 256-603-7901
            <br />
            Home: 256-713-9620
          </div>
        </div>

        {/** /}
        <h2>Postal Address:</h2>
        <div style={{ marginLeft: '25px' }}>
          New Life Worship Center
          <br />
          P. O. Box 7231
          <br />
          Huntsville, AL 35807
          <br />
        </div>
        {/**/}

        <h2>Email Addresses:</h2>
        <div style={{ marginLeft: '25px' }}>
          <div style={{ fontWeight: 'bold' }}>Pastor David Brown:</div>
          <div style={{ marginLeft: '25px' }}>
            <Link href="mailto:pastor@DoActs238.org">pastor@DoActs238.org</Link>
          </div>
          <div style={{ fontWeight: 'bold', marginTop: '10px' }}>
            Webmaster:
          </div>
          <div style={{ marginLeft: '25px' }}>
            <Link href="mailto:webmaster@DoActs238.org">
              webmaster@DoActs238.org
            </Link>
          </div>
        </div>
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
  markerLink: {
    margin: 0,
    padding: 0,
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center'
  }
}));

export default PageContact;
