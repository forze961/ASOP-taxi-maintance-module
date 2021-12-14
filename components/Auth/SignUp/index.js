// @flow Strict
import { useMutation } from 'react-query';
import { request } from 'graphql-request';
import Router, { useRouter } from 'next/router';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
import { user } from '../../UserContext';

/* ==============================
Mutation query body for form submit
================================= */
const SIGNUP_USER = `
  mutation signupUser($data: CreateUserInput!) {
    signupUser(data: $data) {
      userId
      userToken
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

/* ==============================
Custom validation func for formik component
================================= */
const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = '*Required';
  }

  if (!values.name) {
    errors.name = '*Required';
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = '*Required';
  } else if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = '*Passwords not match';
  }

  if (!values.email) {
    errors.email = '*Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '*Invalid email address';
  }

  return errors;
};

export default function SignUp(): React$Node {
  // Get user context (for cookie)
  const { setId } = user() || { setId: (_) => {} };
  const router = useRouter();

  // Initial state for register
  const [signupUser] = useMutation(
    (variables) => request('/api/graphql', SIGNUP_USER, variables),
    {
      onSuccess: (data) => {
        setId(data.signupUser.userId);
        localStorage.setItem('userId', data.signupUser.userId);
        if (typeof window !== 'undefined') {
          router.push('/');
        } else {
          Router.push('/');
        }
      },
      onError: (err) => {
        console.log(err.message);
      },
    },
  );

  // initial state for formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      const { email } = values;
      const { password } = values;
      const { name } = values;

      signupUser({
        data: {
          email,
          password,
          name,
          role: 'FREE_USER',
        },
      }).then(() => resetForm());
    },
  });

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <Box color="error.main">{formik.errors.email ? <div>{formik.errors.email}</div> : null}</Box>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name="name"
              autoComplete="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <Box color="error.main">{formik.errors.name ? <div>{formik.errors.name}</div> : null}</Box>
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
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <Box color="error.main">{formik.errors.password ? <div>{formik.errors.password}</div> : null}</Box>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Password Confirm"
              type="password"
              id="passwordConfirm"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.passwordConfirm}
            />
            <Box color="error.main">{formik.errors.passwordConfirm ? <div>{formik.errors.passwordConfirm}</div> : null}</Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </>
    </Container>
  );
}
