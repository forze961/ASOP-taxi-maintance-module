import { Button } from '@paljs/ui/Button';
import Container from '@paljs/ui/Container';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React from 'react';

import Auth from 'components/Auth';
import Layout from 'Layouts';
import {useRouter} from "next/router";

export default function Index() {
  const router = useRouter();

  return (
    <Layout title="Оберіть графік руху!">
      <Auth title="Оберіть графік руху!">

        <Container>
          <Row>
            <Col breakPoint={{ xs: 12 }}>
              <Row center="xs">
                <Col breakPoint={{ xs: 6 }}>
                  <img src='/icons/choice-graph.png'/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <form>
          <Button style={{
            background: '#F17F14',
            borderRadius: '36.5px',
            borderColor: '#F17F14'
          }}
            status="Success"
            type="button"
            shape="SemiRound"
            fullWidth
                  onClick={() => router.push('/route/choice-route')}
          >
            Вибрати
          </Button>
        </form>
      </Auth>
    </Layout>
  );
}
