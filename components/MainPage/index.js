import { useRouter } from 'next/router';
import App from '../App';
import Main from '../../containers/ViewReports';

function MainPage() {
  const router = useRouter();
  const { category } = router.query;

  return (
    <App>
      <>
        <Main className="wrapper-on-menu" category={category || 1} />
      </>
    </App>
  );
}
export default MainPage;
