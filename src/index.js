import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './components/App';

import 'typeface-roboto';

import { brown, grey } from '@material-ui/core/colors';
import {
  CssBaseline,
  MuiThemeProvider,
  responsiveFontSizes,
  createMuiTheme,
  makeStyles,
  useMediaQuery
} from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import AppMobile from './components/AppMobile';

const useStyles = makeStyles(theme => {
  //console.log('theme: ', theme);
  return {
    themeDiv: {
      width: '100%',
      height: '100%',
      backgroundColor: '#101010', //theme.palette.background.default,
      color: theme.palette.text.primary,
      margin: 0,
      padding: 0
    },
    pageContainer: {
      maxWidth: theme.spacing(theme.app.page.pageMaxWidth),
      minWidth: theme.spacing(theme.app.page.pageMinWidth),
      height: '100%',
      padding: 0,
      margin: 0,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    app: {
      backgroundColor: theme.app.palette.background.default,
      width: '100%',
      height: '100%'
    }
  };
});

const ThemeDiv = ({ children }) => {
  const classes = useStyles();
  return (
    <div id="themeDiv" className={classes.themeDiv}>
      <div id="pageContainer" className={classes.pageContainer}>
        <div id="children" className={classes.app}>
          {children}
        </div>
      </div>
    </div>
  );
};

const AppWrapper = () => {
  let prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  prefersDarkMode = false;

  const theme = React.useMemo(
    () =>
      responsiveFontSizes(
        createMuiTheme({
          app: {
            page: {
              pageMinWidth: 10,
              pageMaxWidth: 120,
              navListWidth: 20,
              appBarHeight: 8 // '64px'
            },
            palette: {
              background: {
                default: prefersDarkMode ? grey[900] : brown[50]
              }
            }
          },
          typography: {
            fontSize: 16,
            fontFamily: [
              'Roboto',
              '-apple-system',
              'BlinkMacSystemFont',
              '"Segoe UI"',
              '"Helvetica Neue"',
              'Arial',
              'sans-serif',
              '"Apple Color Emoji"',
              '"Segoe UI Emoji"',
              '"Segoe UI Symbol"'
            ]
          },
          palette: {
            type: prefersDarkMode ? 'dark' : 'light',
            primary: {
              main: brown[700]
            },
            secondary: {
              main: grey[400]
            }
          }
        })
      ),
    [prefersDarkMode]
  );

  const isMobile: Boolean = useMediaQuery(theme.breakpoints.down('sm'));
  console.log('isMobile', isMobile);

  return (
    <React.StrictMode>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <BrowserRouter basename="/">
          {isMobile ? (
            <AppMobile />
          ) : (
            <ThemeDiv>
              <App />
            </ThemeDiv>
          )}
        </BrowserRouter>
      </MuiThemeProvider>
    </React.StrictMode>
  );
};

const root: ?Element = document.getElementById('root');

if (root != null) {
  ReactDOM.render(<AppWrapper />, root);

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
}
