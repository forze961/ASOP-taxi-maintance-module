import query from 'axios';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import CardRoute from '../../components/Routes/RouteCard';
import withSession from 'lib/session';
import Spinner from '@paljs/ui/Spinner';
import { DutyObj } from 'types';
import { toast } from 'react-toastify';
import ToastContainer from 'components/Toasts';

export default function Index({ user }: any) {
  const [duty, setDuty]: any = useState([]);
  const [loading, setLoading] = useState(false);

  // Hack async function call in functionality component
  useEffect(() => {
    setLoading(true);
    getDutyData().then((r: boolean | DutyObj) => {
      setLoading(false);
      if (r) setDuty(r);
    });
  }, []);

  // Get duty data with backend bridge (hack cors)
  const getDutyData = async () => {
    const { data: body }: any = await query
      .post('/api/getDuty', {
        responseType: 'json',
      })
      .catch((err) => {
        if (err.response.status === 404) {
          return toast.error(`Даних наряду не знайдено!`);
        }
        return toast.error(`Невідома помилка, зверніться до адміністратора!`);
      });
    return body;
  };

  return (
    <Layout title="Оберіть маршрут!" titleNow="Оберіть маршрут" username={user.userName}>
      <ToastContainer />

      {loading && (
        <Spinner status="Warning" size={'Large'}>
          Зачекайте...
        </Spinner>
      )}
      <Row>
        {duty.length > 0 ? (
          <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            {duty.map((route: DutyObj) => (
              <CardRoute key={route.num} num={route.num} endpoints={route.endpoints} tariff={route.tariff} />
            ))}
          </Col>
        ) : (
          <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <h3>Даних наряду не знайдено, спробуйте змінити рухому одиницю або зверніться до диспетчера.</h3>
          </Col>
        )}
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
