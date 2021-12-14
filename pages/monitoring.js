import Box from '@material-ui/core/Box';
import MobileDetect from 'mobile-detect';
import App from '../components/App';
import ServiceMonitoring from '../components/ServiceOnIframe';
import withSession from '../lib/session';
import isUserHasRights from '../lib/isUserHasRights';

const IndexPage = ({ deviceType }) => {
  if (deviceType !== 'desktop') return <h1>This version adaptive only for desktop users...</h1>;

  return (
    <App>
      <>
        <Box m={17} />
        <ServiceMonitoring />
      </>
    </App>
  );
};

export const getServerSideProps = withSession(
  async ({ req, res }) => {
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
      props: { user, deviceType },
    };
  },
);

export default IndexPage;
