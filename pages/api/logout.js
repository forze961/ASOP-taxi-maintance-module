import withSession from '../../lib/session';

export default withSession(async (req, res) => {
  try {
    await req.session.destroy();
    res.status(200).json({ isLoggedIn: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
