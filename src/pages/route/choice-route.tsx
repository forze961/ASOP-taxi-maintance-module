import Container from '@paljs/ui/Container';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React from 'react';
import Layout from 'Layouts';
import CardRoute from "../../components/Routes/RouteCard"

export default function Index() {

  return (
    <Layout title="Оберіть маршрут!">
        <Container>
          <Row>
            <Col breakPoint={{ xs: 12 }}>
              <Row center="xs">
                <Col breakPoint={{ xs: 6 }}>
                  <CardRoute/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
    </Layout>
  );
}
