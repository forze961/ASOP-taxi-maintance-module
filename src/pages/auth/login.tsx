import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import Container from '@paljs/ui/Container';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React from 'react';
import Link from 'next/link';

import Auth, { Group } from 'components/Auth';
import Layout from 'Layouts';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  return (
    <Layout title="Вітаємо!" titleNow="АСОП: taxi">
      <Auth title="Вітаємо!" subTitle="Введіть свій номер телефону та пароль">
        <Container>
          <Row>
            <Col breakPoint={{ xs: 12 }}>
              <Row center="xs">
                <Col breakPoint={{ xs: 6 }}>
                  <img src="/icons/man.png" alt="Асоп: маршрутні таксі" width="200px" height="150px" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <form>
          <InputGroup fullWidth>
            <input type="text" placeholder="Номер телефону" />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="password" placeholder="Пароль" />
          </InputGroup>
          <Group>
            <Link href="/auth/request-password">
              <a>Забули пароль?</a>
            </Link>
            <Link href="/auth/register">
              <a>Зареєструватися?</a>
            </Link>
          </Group>
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
            onClick={() => router.push('/route')}
          >
            Увійти
          </Button>
        </form>
      </Auth>
    </Layout>
  );
}
