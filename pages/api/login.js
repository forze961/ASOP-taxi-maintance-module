import { withIronSession } from 'next-iron-session';
import fetchJson from '../../lib/fetchJson';
import isUserHasRights from '../../lib/isUserHasRights';

export default withIronSession(
  async (req, res) => {
    if (req?.method === 'POST') {
      const { email, password } = req?.body;

      const login = await fetchJson(`${process.env.APP_PROTOCOL}nginx/api/auth-service`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logemail: email, logpassword: password }), // body data type must match "Content-Type" header
      });

      const { status, access } = await isUserHasRights({ login });

      if (!status) {
        // User blocked
        if (access === false) {
          res.status(403).end();
          return;
        }
        // User/password incorrect
        res.status(401).end();
        return;
      }

      if (login) {
        req.session.set('user', { login });
        await req.session.save();
        res.status(201).send('');
        return;
      }

      res.status(403).send('');
      return;
    }

    res.status(404).send('');
  },
  {
    cookieName: 'ROUTETAXIAUTH',
    ttl: process.env.SESSION_TTL,
    cookieOptions: {
      secure: false,
    },
    password: '25h0vJQwWmpL4mv9C3Bqj7GfkUWoTCsH',
  },
);
