import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React from 'react';
import Layout from 'Layouts';
import CardRoute from '../../components/Routes/RouteCard';
import routes from '../../../data/mockRoutes.json';
import withSession from 'lib/session';

export default function Index({ user }: any) {
  return (
    <Layout title="Оберіть маршрут!" titleNow="Оберіть маршрут" username={user.userName}>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          {routes.map((route) => (
            <CardRoute key={route.num} num={route.num} endpoints={route.endpoints} tariff={route.tariff} />
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
