import Container from '@paljs/ui/Container';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React from 'react';
import Layout from 'Layouts';
import CardRoute from "../../components/Routes/RouteCard"
import routes from '../../../data/mockRoutes.json'
import Main from "components/Main";

export default function Index() {

  return (
    <Layout title="Оберіть маршрут!" titleNow="Оберіть маршрут">
      <Main title="Оберіть маршрут!">
        <Container>
          <Row>
            <Col >
              <Row center="xs">
                <Col >
                  {routes.map((route) => (
                      <CardRoute num={route.num} endpoints={route.endpoints}/>)
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Main>
    </Layout>
  );
}
