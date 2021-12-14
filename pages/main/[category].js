import { useRouter } from 'next/router';
import App from '../../components/App';
import Main from '../../containers/ViewReports';

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

export default IndexPage;
