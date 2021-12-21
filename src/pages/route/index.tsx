import { Button } from '@paljs/ui/Button';
import Container from '@paljs/ui/Container';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React from 'react';

import Main from 'components/Main';
import Layout from 'Layouts';
import { useRouter } from 'next/router';
import withSession from 'lib/session';
import { useWakeLock } from 'react-screen-wake-lock';

export default function Index({ user }: any) {
  const router = useRouter();

  const { isSupported, request } = useWakeLock({
    onRequest: () => alert('Screen Wake Lock: requested!'),
    onError: () => alert('An error happened 💥'),
    onRelease: () => alert('Screen Wake Lock: released!'),
  });

  if (isSupported) {
    request().then(() => console.log('Okay'));
  } else console.log('Always wake display not supported');

  return (
    <Layout title="Оберіть графік руху!" titleNow="Вибір графіку руху" username={user.userName}>
      <Main title="Оберіть графік руху!">
        <Container>
          <Row>
            <Col breakPoint={{ xs: 12 }}>
              <Row center="xs">
                <Col breakPoint={{ xs: 6 }}>
                  <img src="/icons/choice-graph.png" alt="Асоп: маршрутні таксі" width="175px" height="150px" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <form>
          <Button
            style={{
              background: '#F17F14',
              borderRadius: '36.5px',
              borderColor: '#F17F14',
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
      </Main>
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
