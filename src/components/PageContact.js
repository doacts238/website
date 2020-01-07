import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

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

        <h2>Email Addresses:</h2>
        <div>
          <table style={{ border: '0px solid black', marginLeft: '25px' }}>
            <tbody>
              <tr>
                <th style={{ textAlign: 'right', verticalAlign: 'top' }}>
                  Pastor David Brown:
                </th>
                <td>
                  <a href="mailto:pastor@DoActs238.org">pastor@DoActs238.org</a>
                </td>
              </tr>
              <tr>
                <th style={{ textAlign: 'right', verticalAlign: 'top' }}>
                  Web Master:
                </th>
                <td>
                  <a href="mailto:webmaster@DoActs238.org">
                    webmaster@DoActs238.org
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Phone Numbers:</h2>
        <div>
          <table style={{ border: '0px solid black', marginLeft: '25px' }}>
            <tbody>
              <tr>
                <th style={{ textAlign: 'right', verticalAlign: 'top' }}>
                  Church:
                </th>
                <td>256-851-2466 (answering machine checked weekly)</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'right', verticalAlign: 'top' }}>
                  Pastor David Brown:
                </th>
                <td>
                  Home: 256-885-3784
                  <br />
                  Cell: 256-603-7901
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Postal Address:</h2>
        <div style={{ marginLeft: '25px' }}>
          New Life Worship Center
          <br />
          P. O. Box 7231
          <br />
          Huntsville, AL 35807
          <br />
        </div>

        <h2>Street Address:</h2>
        <div style={{ marginLeft: '25px' }}>
          New Life Worship Center
          <br />
          403 Treymore Avenue
          <br />
          Huntsville, AL 35811
          <br />
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
  }
}));

export default PageContact;
