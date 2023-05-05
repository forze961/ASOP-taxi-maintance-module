import { useRouter } from 'next/router';
import App from '../../components/App';
import Main from '../../containers/ViewReports';
import isUserHasRights from '../../lib/isUserHasRights';
import withSession from '../../lib/session';

const IndexPage = () => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <App>
      <>
        <Main className="wrapper-on-menu" category={category} />
      </>
    </App>
  );
};

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
      props: { user },
    };
  },
);

export default IndexPage;
