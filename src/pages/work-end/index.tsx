import { Button } from '@paljs/ui/Button';
import Container from '@paljs/ui/Container';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React from 'react';

import Main from 'components/Main';
import Layout from 'Layouts';
import { useRouter } from 'next/router';
import withSession from 'lib/session';
import { toast } from 'react-toastify';
import ToastContainer from 'components/Toasts';

export default function Index({ user }: any) {
  const router = useRouter();

  const endTrip = () => {
    typeof localStorage !== 'undefined' && localStorage.removeItem('curTrip');
    toast.success(`Поїздку завершено!`);
    setTimeout(() => {
      redirectToMain();
    }, 2000);
  };

  const cancelEndTrip = () => {
    toast.warning(`Відміна...`);
    setTimeout(() => {
      redirectToMain();
    }, 2000);
  };

  const redirectToMain = () => {
    if (typeof window !== 'undefined') {
      router.push('/route');
    } else {
      router.push('/route');
    }
  };

  return (
    <Layout title="Закінчити поїздку" titleNow="Закінчити поїздку" username={user.userName}>
      <ToastContainer />

      <Main title="Ви впевнені, що бажаєте закінчити поїздку?">
        <Container>
          <Row>
            <Col breakPoint={{ xs: 12 }}>
              <Row center="xs">
                <img src="/icons/location.png" alt="Асоп: маршрутні таксі" />
              </Row>
            </Col>
          </Row>
          <Row>
            <Col breakPoint={{ xs: 12 }}>
              <Row center="xs">
                <Col breakPoint={{ xs: 6 }}>
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
                    onClick={cancelEndTrip}
                  >
                    Відміна
                  </Button>
                </Col>
                <Col breakPoint={{ xs: 6 }}>
                  <Button
                    style={{
                      background: '#3FBA03',
                      borderRadius: '36.5px',
                      borderColor: '#3FBA03',
                    }}
                    status="Success"
                    type="button"
                    shape="SemiRound"
                    fullWidth
                    onClick={endTrip}
                  >
                    Закінчити
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
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
