import { useRouter } from 'next/router';
import EachCar from '../../../components/EachCar';

const Vehicle = () => {
  const router = useRouter();
  const { num, date } = router.query;

  if (num) return (<EachCar carNumGlobal={num} dateGlobal={date} fillial="0" />);

  return null;
};

export default Vehicle;
