// @flow
import { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LuxonUtils from '@date-io/luxon';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import '../public/styles/style.css';
import { SnackbarProvider } from 'notistack';
import { UserContextProvider } from '../components/UserContext';
import SnackbarCloseButton from '../components/snackbarClose';
import theme from '../lib/theme';

function MyApp({ Component, pageProps }: $FlowFixMeProps): React$Node {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <CssBaseline />
          <SnackbarProvider
            maxSnack={9}
            autoHideDuration={15000}
            action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
          >
            <Component {...pageProps} />
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default MyApp;
