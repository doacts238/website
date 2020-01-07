import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, makeStyles } from '@material-ui/core';
import mapImage from '../images/map.gif';

import classNames from 'classnames';

type Props = {
  className?: string
};

const PageServices = ({ className }: Props) => {
  const classes = useStyles();

  document.title = 'Do Acts 2:38 - Service Times and Directions';

  return (
    <div className={classNames(className, classes.root)}>
      <Typography component="div" variant="body2">
        <h1 style={{ marginTop: 0 }}>Service Times &amp; Directions</h1>
        <h2>Service Times</h2>
        <div>
          <table style={{ border: '0px solid black', marginLeft: '25px' }}>
            <tbody>
              <tr>
                <th style={{ textAlign: 'right', verticalAlign: 'top' }}>
                  Sunday Morning:
                </th>
                <td>9:45 - 12:30</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'right', verticalAlign: 'top' }}>
                  Sunday Night:
                </th>
                <td>6:00 - 8:30</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'right', verticalAlign: 'top' }}>
                  Wednesday Night:
                </th>
                <td>7:00 - 8:30</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>Directions</h2>
        <p>
          The Church is located at 403 Treymore Avenue in Huntsville, AL. Please
          fee free to{' '}
          <Link to="/contact" title="Contact Us">
            Contact Us
          </Link>{' '}
          if you need a ride from the Church Bus Ministry.
        </p>
        <p>
          <img
            src={mapImage}
            alt="Map to New Life Worship Center in Huntsville, AL."
          />
        </p>
        <h3>From South Memorial Parkway:</h3>
        <ol>
          <li>
            <b>Go North on Memorial Parkway.</b> Go past Oakwood and Max Luther.
          </li>
          <li>
            <b>Turn Right onto Sparkman Drive</b> (Hwy 72 E) at the Hardee's. Go
            through the light at Washington Street.
          </li>
          <li>
            <b>Turn Left on Mastin Lake</b> at the light.
          </li>
          <li>
            <b>Turn Right onto Treymore Ave</b> which is second street to the
            right.
          </li>
        </ol>
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
  }
}));

export default PageServices;
