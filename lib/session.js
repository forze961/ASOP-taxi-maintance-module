// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from 'next-iron-session';

export default function withSession(handler) {
  return withIronSession(handler, {
    password: '25h0vJQwWmpL4mv9C3Bqj7GfkUWoTCsH',
    cookieName: 'ROUTETAXIAUTH',
    ttl: process.env.SESSION_TTL,
    cookieOptions: {
      secure: false,
    },
  });
}
