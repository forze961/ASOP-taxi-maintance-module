import MainPage from '../components/MainPage';
import withSession from '../lib/session';
import isUserHasRights from '../lib/isUserHasRights';

const IndexPage = ({ deviceType, user }) => (<MainPage deviceType={deviceType} user={user} />);

export const getServerSideProps = withSession(
  async ({ req, res }) => {
    const user = req.session.get('user');

    if (!user) {
      res.setHeader('location', '/signin');
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }
    const { status } = await isUserHasRights(user);

    if (!status) {
      res.setHeader('location', '/signin');
      res.statusCode = 302;
      res.end();
    }

    return {
      props: { user: user || null },
    };
  },
);

export default IndexPage;
