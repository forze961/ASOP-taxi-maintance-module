// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from 'next-iron-session';

export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.APPLICATION_SECRET,
    cookieName: 'DC8MONITORINGAUTH',
    ttl: process.env.SESSION_TTL,
    cookieOptions: {
      secure: false,
    },
  });
}
