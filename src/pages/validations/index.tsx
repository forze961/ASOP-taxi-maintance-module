import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import ValidationCard from '../../components/Validations/ValidationCard';
import validations from '../../../data/mockValidations.json';
import withSession from 'lib/session';

const getTripFromStore = () => {
  return typeof localStorage !== 'undefined' && localStorage.getItem('curTrip');
};

export default function Index({ user }: any) {
  const [curTrip, setCurTrip] = useState(getTripFromStore() || '');

  useEffect(() => {
    const trip = getTripFromStore();
    if (trip) {
      setCurTrip(trip);
    }
  }, []);

  return (
    <Layout title="Валідації" titleNow="Валідації" username={user.userName}>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          {validations.map((validation: any, index: number) => (
            <ValidationCard
              key={`${validation.trip}-${index}`}
              trip={validation.trip}
              num={validation.num}
              count={validation.count}
              isCurTrip={validation.trip === curTrip}
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
