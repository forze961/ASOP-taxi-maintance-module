import MobileDetect from 'mobile-detect';
import withSession from '../lib/session';

const IndexPage = ({ deviceType }) => {
  if (deviceType !== 'desktop') return <h1>This version adaptive only for desktop users...</h1>;

  return (
    <>
    </>
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

    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();

    return {
      props: { user, deviceType },
    };
  },
);

export default IndexPage;
