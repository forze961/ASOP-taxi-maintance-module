// @flow Strict
// eslint-disable-next-line import/no-unresolved
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
import useWindowSize from '../../screenSizeHelper';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(35),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#ED9137',
    color: 'white',
    height: 55,
  },
}));

export default function SignIn(): React$Node {
  const size = useWindowSize();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (typeof window !== 'undefined') {
      router.push('/main/1');
    } else {
      router.push('/main/1');
    }
  };

  const classes = useStyles();

  return (
    <>
      {size.width > 1250 ? (
        <Grid
          container
          style={{
            height: '100vh',
          }}
        >

          <Grid xs={6} sm={6} md={6} style={{ borderRight: '1px solid #CACACA', height: '100%' }}>
            <Container component="main" maxWidth="xs">
              <div className={classes.paper}>
                <Box className={classes.container}>
                  <Box my={3} mx={8}>
                    <h1 className="sign-in-h1">Вітаємо!</h1>
                  </Box>
                </Box>

                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                    className={classes.submit}
                  >
                    Увійти
                  </Button>

                  {loading && (
                    <LinearProgress />
                  )}

                </form>
              </div>
            </Container>
          </Grid>
          <Grid xs={6} sm={6} md={6}>
            <Container component="main" justify="center">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
              >
                <img src="/images/Group.png" />
              </Box>
            </Container>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <CssBaseline />
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Box className={classes.container}>
                <Box my={3} mx={8}>
                  <h1 className="sign-in-h1">Вітаємо!</h1>
                </Box>
              </Box>

              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                  className={classes.submit}
                >
                  Увійти
                </Button>

                {loading && (
                  <LinearProgress />
                )}

              </form>
            </div>
          </Container>
        </Grid>
      )}
    </>
  );
}
