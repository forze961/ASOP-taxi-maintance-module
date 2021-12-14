import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import AllFilies from '../../../components/AllFilies/statNowService';

const StatNow = () => {
  const router = useRouter();
  const { title, status } = router.query;

  if (title && (status.includes('true') || status.includes('false'))) return (<AllFilies title={title} status={status.includes('true')} />);
  return <ErrorPage statusCode={404} />;
};

export default StatNow;
