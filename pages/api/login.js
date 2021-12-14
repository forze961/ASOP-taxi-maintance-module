import { withIronSession } from 'next-iron-session';
import fetchJson from '../../lib/fetchJson';
import isUserHasRights from '../../lib/isUserHasRights';

export default withIronSession(
  async (req, res) => {
    if (req.method === 'POST') {
      const { email, password, ip } = req.body;

      const login = await fetchJson(`${process.env.BACKEND_SERVICE}/auth-service`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logemail: email, logpassword: password, ip: JSON.stringify(ip) }), // body data type must match "Content-Type" header
      });

      const { status, user, access } = await isUserHasRights({ login });

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
        return res.status(201).send('');
      }

      return res.status(403).send('');
    }

    return res.status(404).send('');
  },
  {
    cookieName: 'DC8MONITORINGAUTH',
    ttl: process.env.SESSION_TTL,
    cookieOptions: {
      secure: false,
    },
    password: process.env.APPLICATION_SECRET,
  },
);
