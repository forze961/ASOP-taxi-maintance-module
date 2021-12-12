// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from 'next-iron-session';

export default function withSession(handler: any) {
  return withIronSession(handler, {
    password: 'lbIaVoYuyUeY0ZXDTU3dHJ4DcIy3nHsj',
    cookieName: 'TaxiAuth',
    cookieOptions: {
      secure: false,
    },
  });
}
