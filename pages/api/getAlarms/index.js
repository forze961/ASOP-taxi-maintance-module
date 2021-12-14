import withSession from '../../../lib/session';
import fetchJson from '../../../lib/fetchJson';
import isUserHasRights from '../../../lib/isUserHasRights';

export default withSession(async (req, res) => {
  const userData = req.session.get('user');
  const { status, user } = await isUserHasRights(userData);

  if (!status) {
    res.status(401).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      const getAlarms = await fetchJson(`${process.env.BACKEND_SERVICE}/getLastAlarms${user.api_token}`, {
        method: 'get',
      });
      res.json(getAlarms);
    }
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
