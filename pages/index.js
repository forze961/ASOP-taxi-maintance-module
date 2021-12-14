import MobileDetect from 'mobile-detect';
import withSession from '../lib/session';
import MainPage from '../components/MainPage';

const IndexPage = ({ deviceType, user }) => {
  if (deviceType !== 'desktop') return <h1>This version adaptive only for desktop users...</h1>;

  return (<MainPage deviceType={deviceType} user={user} />);
};

export const getServerSideProps = withSession(
  async ({ req }) => {
    const user = req.session.get('user');

    let deviceType;
    let userAgent;

    if (req) {
      userAgent = req.headers['user-agent'];
    } else {
      userAgent = navigator.userAgent;
    }

    const md = new MobileDetect(userAgent);
    if (md.tablet()) {
      deviceType = 'tablet';
    } else if (md.mobile()) {
      deviceType = 'mobile';
    } else {
      deviceType = 'desktop';
    }

    return {
      props: { user: user || null, deviceType },
    };
  },
);

export default IndexPage;
