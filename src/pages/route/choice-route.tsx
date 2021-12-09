import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React from 'react';
import Layout from 'Layouts';
import CardRoute from '../../components/Routes/RouteCard';
import routes from '../../../data/mockRoutes.json';
import Main from 'components/Main';

export default function Index() {
  return (
    <Layout title="Оберіть маршрут!" titleNow="Оберіть маршрут">
      <Main>
        <Row>
          <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            {routes.map((route) => (
              <CardRoute key={route.num} num={route.num} endpoints={route.endpoints} />
            ))}
          </Col>
        </Row>
      </Main>
    </Layout>
  );
}
