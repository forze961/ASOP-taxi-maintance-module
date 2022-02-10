import { useRouter } from 'next/router';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import CardTrip from '../../components/Routes/TripCard';
import withSession from 'lib/session';
import ToastContainer from 'components/Toasts';
import { toast } from 'react-toastify';
import { getCurrentDate } from '../../lib/utils';
import { DutyObj } from 'types';

const getTripFromStore = () => {
  return typeof localStorage !== 'undefined' && localStorage.getItem('curTrip');
};

const getDutyFromStore = () => {
  const prepareDuty = typeof localStorage !== 'undefined' && localStorage.getItem('curDuty');

  if (prepareDuty) return JSON.parse(prepareDuty);

  return false;
};

export default function Index({ user }: any) {
  const router = useRouter();
  const { trip: routeNum }: any = router.query;
  const { trips = [], stations = [] }: any = getDutyFromStore();

  const [curTrip, setCurTrip] = useState(getTripFromStore() || '');

  const changeTrip = (trip: string) => {
    typeof localStorage !== 'undefined' && localStorage.setItem('curTrip', trip);
    const currDuty: DutyObj = getDutyFromStore();

    // Change time, when trip has bin started
    if (currDuty) {
      const findCurTripIndex = currDuty.trips.findIndex((x) => x.trip === trip);

      if (findCurTripIndex !== -1) {
        currDuty.trips[findCurTripIndex].time = getCurrentDate();
        typeof localStorage !== 'undefined' && localStorage.setItem('curDuty', JSON.stringify(currDuty));
      }
    }

    toast.success(`Рейс змінено! Поточний рейс: ${trip}`);
    setCurTrip(trip);
  };

  useEffect(() => {
    const trip = getTripFromStore();
    if (trip) {
      setCurTrip(trip);
    }
  }, []);

  return (
    <Layout title="Оберіть рейс!" titleNow="Оберіть рейс" username={user.userName}>
      <ToastContainer />

      <Row>
        <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          {trips.map((trip: any) => (
            <CardTrip
              key={trip.name}
              name={trip.trip}
              time={trip.time}
              stations={stations}
              route={routeNum}
              onChangeTrip={changeTrip}
              isCurTrip={trip.trip === curTrip}
            />
          ))}
        </Col>
      </Row>
    </Layout>
  );
}

export const getServerSideProps = withSession(async ({ req, res }: any) => {
  const user = req.session.get('user');

  if (!user) {
    res.setHeader('location', '/auth/login');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: { user },
  };
});
