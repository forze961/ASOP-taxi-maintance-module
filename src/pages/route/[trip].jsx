import { useRouter } from 'next/router';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React from 'react';
import Layout from 'Layouts';
import CardTrip from '../../components/Routes/TripCard';
import routes from '../../../data/mockRoutes.json';
import Main from 'components/Main';

const getTrips = (route = 0) => {
  if (route !== 0) {
    const result = routes.find((cur) => cur.num === route);

    if (result) return result;
  }

  return [];
};

export default function Index() {
  const router = useRouter();
  const { trip: routeNum } = router.query;
  const { trips = [], stations = [] } = getTrips(Number(routeNum));

  return (
    <Layout title="Оберіть рейс!" titleNow="Оберіть рейс">
      <Main>
        <Row>
          <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            {trips.map((trip) => (
              <CardTrip key={trip.name} name={trip.trip} time={trip.time} stations={stations} route={routeNum} />
            ))}
          </Col>
        </Row>
      </Main>
    </Layout>
  );
}
