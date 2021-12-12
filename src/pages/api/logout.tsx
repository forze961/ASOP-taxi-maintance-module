import withSession from '../../lib/session';

export default withSession(async (req: any, res: any) => {
  req.session.destroy();
  res.setHeader('location', '/auth/login');
  res.statusCode = 302;
  res.end();
});
