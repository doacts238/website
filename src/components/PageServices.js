import React, { Fragment } from 'react';
import { Typography, makeStyles, Link } from '@material-ui/core';
import MapMarkerIcon from 'mdi-react/MapMarkerIcon';

import classNames from 'classnames';

import topImage from '../images/servicesTop.jpg';

type Props = {
  className?: string
};

const PageServices = ({ className }: Props) => {
  const classes = useStyles();

  document.title = 'Do Acts 2:38 - Service Times';

  return (
    <Fragment>
      <img src={topImage} alt="Church building" className={classes.topImage} />
      <div className={classNames(className, classes.root)}>
        <Typography component="div" variant="body2" color="textPrimary">
          <h1 style={{ marginTop: 0 }}>Service Times</h1>
          <div>
            <div style={{ fontWeight: 'bold' }}>Sunday Morning:</div>
            <div style={{ marginLeft: '25px' }}>10:30 - 12:00</div>
            <div style={{ fontWeight: 'bold', marginTop: '10px' }}>
              Wednesday Night:
            </div>
            <div style={{ marginLeft: '25px' }}>7:00 - 8:30</div>
          </div>

          <h3 style={{ marginBottom: '10px' }}>Street Address:</h3>
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
                color="textPrimary"
              >
                Show on Google Maps
              </Link>
            </div>
          </div>
        </Typography>
      </div>
    </Fragment>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    marginLeft: 'auto',
    marginReft: 'auto',
    padding: theme.spacing(3),
    width: '100%',
    minHeight: '100%',
    backgroundColor: theme.palette.background.default
  },
  topImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    [theme.breakpoints.up('md')]: {
      borderBottomLeftRadius: '10px'
    }
  },
  markerLink: {
    margin: 0,
    padding: 0,
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  }
}));

export default PageServices;
